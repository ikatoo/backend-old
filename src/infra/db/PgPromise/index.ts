import { env } from '@/utils/env'
import pgPromise from 'pg-promise'

const pgp = pgPromise({})

if (!global.PG_PROMISE_DB) {
  global.PG_PROMISE_DB = pgp({
    user: env.POSTGRES_USER,
    password: env.POSTGRES_PASSWORD,
    host: (env.NODE_ENV === "test" || env.NODE_ENV === "dev") ? "localhost" : env.POSTGRES_HOSTNAME,
    port: env.POSTGRES_PORT,
    database: env.POSTGRES_DBNAME,
    idleTimeoutMillis: 100
  })
  const db = global.PG_PROMISE_DB;
}

const db = global.PG_PROMISE_DB;

export default db