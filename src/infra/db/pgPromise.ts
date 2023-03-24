import { env } from '@/env'
import pgPromise from 'pg-promise'

const pgp = pgPromise({})

global.DB = global.DB ?? pgp({
  user: env.POSTGRES_USER,
  password: env.POSTGRES_PASSWORD,
  host: env.NODE_ENV === "test" ? "localhost" : env.POSTGRES_HOSTNAME,
  port: env.POSTGRES_PORT,
  database: env.POSTGRES_DBNAME,
  idleTimeoutMillis: 100
})

const db = global.DB

export default db