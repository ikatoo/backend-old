import { env } from '@/env'
import pgPromise from 'pg-promise'

const pgp = pgPromise({})

const db = pgp({
  user: env.POSTGRES_USER,
  password: env.POSTGRES_PASSWORD,
  host: env.POSTGRES_HOSTNAME,
  port: env.POSTGRES_PORT,
  database: env.POSTGRES_DBNAME,
  idleTimeoutMillis: 100
})

db.none(`create table if not exists about_page (
  id int primary key generated by default as identity,
  title varchar(80) not null,
  description varchar(80) not null,
  illustrationURL varchar(200),
  illustrationALT varchar(200)
);`)

export default db
