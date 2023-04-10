import cors from 'cors'
import express from 'express'

import { routes } from './routes'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.disable('x-powered-by').disable('etag')

app.use(cors())

app.use(routes)

export { app }