import { createInstallationToken, getInstallationId, signAppJwt } from './github-client'
import { GITHUB_CONFIG } from '@/consts'
import { useAuthStore } from '@/hooks/use-auth'
import { toast } from 'sonner'
import { validateGitHubConfig } from './config-validation'

/**
 * Create a short-lived GitHub Installation Token for one operation.
 * The private key stays in Zustand memory and is never written to Web Storage.
 */
export async function getAuthToken(): Promise<string> {
	validateGitHubConfig({
		owner: GITHUB_CONFIG.OWNER,
		repo: GITHUB_CONFIG.REPO,
		branch: GITHUB_CONFIG.BRANCH,
		appId: GITHUB_CONFIG.APP_ID
	})

	const privateKey = useAuthStore.getState().privateKey
	if (!privateKey) {
		throw new Error('需要先设置私钥。请使用 useAuth().setPrivateKey()')
	}

	toast.info('正在签发 JWT...')
	const jwt = signAppJwt(GITHUB_CONFIG.APP_ID, privateKey)

	toast.info('正在获取安装信息...')
	const installationId = await getInstallationId(jwt, GITHUB_CONFIG.OWNER, GITHUB_CONFIG.REPO)

	toast.info('正在创建安装令牌...')
	return createInstallationToken(jwt, installationId)
}
