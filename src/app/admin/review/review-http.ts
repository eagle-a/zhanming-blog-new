export async function responseJson<T>(response: Response): Promise<T> {
	const body = (await response.json().catch(() => ({}))) as { error?: string } & T
	if (!response.ok) throw new Error(body.error || `请求失败 (${response.status})`)
	return body
}
