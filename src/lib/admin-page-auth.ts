import 'server-only'

import { cookies } from 'next/headers'
import { ADMIN_SESSION_COOKIE, verifyAdminSessionToken } from '@/lib/admin-auth'

export async function hasAdminPageSession(): Promise<boolean> {
	const cookieStore = await cookies()
	return verifyAdminSessionToken(cookieStore.get(ADMIN_SESSION_COOKIE)?.value)
}
