import 'server-only'

import { drizzle as neonDrizzle } from 'drizzle-orm/neon-serverless'
import { drizzle as nodePostgresDrizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'
import * as schema from './schema'

type Database = ReturnType<typeof neonDrizzle<typeof schema>>

let database: Database | undefined
const globalForDatabase = globalThis as typeof globalThis & { zhanmingBlogLocalPool?: Pool }

function isLoopbackDatabase(connectionString: string): boolean {
	const hostname = new URL(connectionString).hostname.toLowerCase()
	return hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '[::1]'
}

export function getDb() {
	if (database) return database

	const connectionString = process.env.DATABASE_URL?.trim()
	if (!connectionString) {
		throw new Error('DATABASE_URL is not configured')
	}

	if (isLoopbackDatabase(connectionString)) {
		const pool = globalForDatabase.zhanmingBlogLocalPool || new Pool({ connectionString, max: 10 })
		if (process.env.NODE_ENV !== 'production') globalForDatabase.zhanmingBlogLocalPool = pool
		database = nodePostgresDrizzle(pool, { schema }) as unknown as Database
	} else {
		database = neonDrizzle(connectionString, { schema })
	}
	return database
}
