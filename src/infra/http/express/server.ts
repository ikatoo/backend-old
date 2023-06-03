import cors from 'cors'
import express, { NextFunction, Request, Response } from 'express'

import { routes } from './routes'
import { errorMiddleware } from './middlewares/errorMiddleware'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.disable('x-powered-by').disable('etag')

app.use(cors())

app.use(routes)

app.use(errorMiddleware)

export { app }