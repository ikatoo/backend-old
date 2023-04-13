import { Router } from 'express'
import { aboutRoutes } from './about'
import { contactRoutes } from './contactPage'
import { projectsRoute } from './projectsPage'

const routes = Router()

routes.use(aboutRoutes)
routes.use(contactRoutes)
routes.use(projectsRoute)

export { routes }
