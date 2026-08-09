import { NextResponse } from 'next/server'
import {
	ADMIN_SESSION_COOKIE,
	ADMIN_SESSION_MAX_AGE,
	assertSameOrigin,
	assertWritableEnvironment,
	createAdminSessionToken,
	isAdminRequest,
	verifyAdminPassword
} from '@/lib/admin-auth'
import { clearAdminLoginAttempts, consumeAdminLoginAttempt } from '@/lib/admin-login-rate-limit'
import { routeErrorResponse } from '@/lib/route-errors'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export function GET(request: Request): Response {
	return Response.json({ authenticated: isAdminRequest(request) }, { headers: { 'Cache-Control': 'no-store' } })
}

export async function POST(request: Request): Promise<Response> {
	try {
		assertSameOrigin(request)
		assertWritableEnvironment()
		const body = (await request.json()) as { password?: unknown }
		const rateLimit = await consumeAdminLoginAttempt(request)
		if (!rateLimit.allowed) {
			return Response.json(
				{ error: '登录尝试过多，请稍后重试' },
				{ status: 429, headers: { 'Cache-Control': 'no-store', 'Retry-After': String(rateLimit.retryAfterSeconds) } }
			)
		}
		if (typeof body.password !== 'string' || !(await verifyAdminPassword(body.password))) {
			return Response.json({ error: '密码错误' }, { status: 401 })
		}
		await clearAdminLoginAttempts(request)

		const response = NextResponse.json({ authenticated: true })
		response.cookies.set(ADMIN_SESSION_COOKIE, createAdminSessionToken(), {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'strict',
			path: '/',
			maxAge: ADMIN_SESSION_MAX_AGE
		})
		response.headers.set('Cache-Control', 'no-store')
		return response
	} catch (error) {
		return routeErrorResponse(error)
	}
}

export function DELETE(request: Request): Response {
	try {
		assertSameOrigin(request)
		const response = NextResponse.json({ authenticated: false })
		response.cookies.set(ADMIN_SESSION_COOKIE, '', {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'strict',
			path: '/',
			maxAge: 0
		})
		response.headers.set('Cache-Control', 'no-store')
		return response
	} catch (error) {
		return routeErrorResponse(error)
	}
}
