import { connect } from 'node:net'

// Local development must never inherit shared Neon/Blob write credentials
// from .env.local. Use the isolated loopback database only when it is running;
// otherwise keep DATABASE_URL explicitly empty so public pages use Git fallback.
const localPostgresAvailable = await new Promise(resolve => {
	const socket = connect({ host: '127.0.0.1', port: 54329 })
	const finish = available => {
		socket.destroy()
		resolve(available)
	}
	socket.setTimeout(500, () => finish(false))
	socket.once('connect', () => finish(true))
	socket.once('error', () => finish(false))
})
process.env.DATABASE_URL = localPostgresAvailable ? 'postgresql://postgres@127.0.0.1:54329/zhanming_blog_dev' : ''
process.env.BLOB_READ_WRITE_TOKEN = ''

if (!localPostgresAvailable) console.warn('[local] PostgreSQL 127.0.0.1:54329 is unavailable; using read-only Git content fallback.')

await import('next/dist/bin/next')
