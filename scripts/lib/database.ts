import { drizzle as neonDrizzle } from 'drizzle-orm/neon-serverless'
import { drizzle as postgresDrizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'
import * as schema from '../../src/db/schema.ts'

export type ScriptDatabase = ReturnType<typeof neonDrizzle<typeof schema>>

/**
 * Maintenance scripts run from an ordinary desktop network, where the Neon
 * WebSocket endpoint can be blocked while plain TLS to `*.neon.tech:5432` still
 * works. Set `BLOG_SCRIPT_DATABASE_DRIVER=pg` to use node-postgres on a remote
 * host; loopback hosts always use it.
 */
export function openScriptDatabase(connectionString: string): { db: ScriptDatabase; close: () => Promise<void> } {
	const hostname = new URL(connectionString).hostname.toLowerCase()
	const isLoopback = ['localhost', '127.0.0.1', '[::1]'].includes(hostname)
	const driver = (process.env.BLOG_SCRIPT_DATABASE_DRIVER || '').trim().toLowerCase()
	if (driver && driver !== 'pg' && driver !== 'neon-websocket') throw new Error('BLOG_SCRIPT_DATABASE_DRIVER 只支持 pg 或 neon-websocket')
	if (isLoopback || driver === 'pg') {
		const pool = new Pool({ connectionString, max: 4 })
		return { db: postgresDrizzle(pool, { schema }) as unknown as ScriptDatabase, close: () => pool.end() }
	}
	return { db: neonDrizzle(connectionString, { schema }), close: async () => undefined }
}
