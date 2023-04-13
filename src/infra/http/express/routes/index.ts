import { Router } from 'express'
import { aboutRoutes } from './about'
import { contactRoutes } from './contactPage'
import { projectsRoutes } from './projectsPage'

const routes = Router()

routes.use(aboutRoutes)
routes.use(contactRoutes)
routes.use(projectsRoutes)

export { routes }
