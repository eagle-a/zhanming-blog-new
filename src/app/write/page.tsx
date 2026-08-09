import { AdminLoginGate } from '@/components/admin-login-gate'
import { hasAdminPageSession } from '@/lib/admin-page-auth'
import WritePageClient from './write-page-client'

export default async function WritePage() {
	return (await hasAdminPageSession()) ? <WritePageClient /> : <AdminLoginGate />
}
