import { drizzle as neonDrizzle } from 'drizzle-orm/neon-serverless'
import { drizzle as postgresDrizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'
import * as schema from '../../src/db/schema.ts'

export type ScriptDatabase = ReturnType<typeof neonDrizzle<typeof schema>>

export function openScriptDatabase(connectionString: string): { db: ScriptDatabase; close: () => Promise<void> } {
	const hostname = new URL(connectionString).hostname.toLowerCase()
	if (['localhost', '127.0.0.1', '[::1]'].includes(hostname)) {
		const pool = new Pool({ connectionString, max: 4 })
		return { db: postgresDrizzle(pool, { schema }) as unknown as ScriptDatabase, close: () => pool.end() }
	}
	return { db: neonDrizzle(connectionString, { schema }), close: async () => undefined }
}
