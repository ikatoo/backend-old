import { Router } from 'express'
import { aboutRoutes } from './about'

const routes = Router()

routes.use(aboutRoutes)

export { routes }
