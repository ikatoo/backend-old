import { Router } from 'express'
import { aboutRoutes } from './about'
import { contactRoutes } from './contactPage'
import { projectsRoutes } from './projectsPage'
import { skillsRoutes } from './skillsPage'

const routes = Router()

routes.use(aboutRoutes)
routes.use(contactRoutes)
routes.use(projectsRoutes)
routes.use(skillsRoutes)

export { routes }
