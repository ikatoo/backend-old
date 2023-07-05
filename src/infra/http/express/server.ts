import cors from 'cors';
import express from 'express';

import { env } from '@/utils/env';
import morgan from 'morgan';
import { errorMiddleware } from './middlewares/errorMiddleware';
import { routes } from './routes';

const app = express()

env.NODE_ENV.toLowerCase().startsWith('dev')
  ? app.use(morgan('dev'))
  : app.use(morgan('combined'))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.disable('x-powered-by').disable('etag')

app.use(cors())

app.use(routes)

app.use(errorMiddleware)

export { app };
