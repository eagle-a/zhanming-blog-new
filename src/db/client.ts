import 'server-only'

import { drizzle } from 'drizzle-orm/neon-serverless'
import * as schema from './schema'

let database: ReturnType<typeof drizzle<typeof schema>> | undefined

export function getDb() {
	if (database) return database

	const connectionString = process.env.DATABASE_URL?.trim()
	if (!connectionString) {
		throw new Error('DATABASE_URL is not configured')
	}

	database = drizzle(connectionString, { schema })
	return database
}
