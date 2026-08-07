import { saveContentDocument } from '@/lib/content-client'

export type PushSnippetsParams = { snippets: string[]; expectedVersion: number }

export function pushSnippets({ snippets, expectedVersion }: PushSnippetsParams) {
	return saveContentDocument('snippets', snippets, expectedVersion)
}
