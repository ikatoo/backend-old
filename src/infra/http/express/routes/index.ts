import { Router } from 'express'
import { aboutRoutes } from './about'
import { contactRoutes } from './contactPage'

const routes = Router()

routes.use(aboutRoutes)
routes.use(contactRoutes)

export { routes }
