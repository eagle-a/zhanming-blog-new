import { createHash } from 'node:crypto'
import { sql } from 'drizzle-orm'
import { assertAdminRequest } from '@/lib/admin-auth'
import { getDb } from '@/db/client'
import { routeErrorResponse } from '@/lib/route-errors'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/**
 * Exposes only non-secret resource identity to an authenticated administrator.
 * This is intended to distinguish Vercel/Neon environments during incidents;
 * it must never return the connection string itself.
 */
export async function GET(request: Request): Promise<Response> {
	try {
		assertAdminRequest(request)
		const identity = (await getDb().execute(sql`select current_database() as database, current_schema() as schema`)).rows[0]
		const connectionString = process.env.DATABASE_URL?.trim() || ''
		return Response.json(
			{
				environment: process.env.BLOG_RESOURCE_ENV || process.env.VERCEL_ENV || 'development',
				deployment: process.env.VERCEL_GIT_COMMIT_SHA || null,
				database: {
					name: typeof identity?.database === 'string' ? identity.database : null,
					schema: typeof identity?.schema === 'string' ? identity.schema : null,
					fingerprint: connectionString ? createHash('sha256').update(connectionString).digest('hex').slice(0, 16) : null
				}
			},
			{ headers: { 'Cache-Control': 'no-store' } }
		)
	} catch (error) {
		return routeErrorResponse(error)
	}
}
