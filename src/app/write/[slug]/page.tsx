import { AdminLoginGate } from '@/components/admin-login-gate'
import { hasAdminPageSession } from '@/lib/admin-page-auth'
import WriteContent from './write-content'

export default async function Page() {
	return (await hasAdminPageSession()) ? <WriteContent /> : <AdminLoginGate title='编辑文章' />
}
