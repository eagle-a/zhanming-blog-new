import { randomBytes, scryptSync } from 'node:crypto'
import { createInterface } from 'node:readline/promises'
import { stdin, stdout } from 'node:process'

const readline = createInterface({ input: stdin, output: stdout })
const password = await readline.question('Admin password: ', { hideEchoBack: true })
readline.close()

if (password.length < 16) {
	console.error('Password must be at least 16 characters.')
	process.exit(1)
}

const salt = randomBytes(16)
const hash = scryptSync(password, salt, 64, { N: 16384, r: 8, p: 1 })

console.log('\nAdd these values to Vercel Production, Preview, and Development:')
console.log(`BLOG_ADMIN_PASSWORD_HASH=scrypt$16384$8$1$${salt.toString('base64url')}$${hash.toString('base64url')}`)
console.log(`BLOG_SESSION_SECRET=${randomBytes(48).toString('base64url')}`)
