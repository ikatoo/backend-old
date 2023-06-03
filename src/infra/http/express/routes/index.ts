import 'express-async-errors'
import { Router } from 'express'
import { aboutRoutes } from './about'
import { contactRoutes } from './contactPage'
import { projectsRoutes } from './projectsPage'
import { skillsRoutes } from './skillsPage'
import { version } from 'package.json';

const routes = Router()

routes.get('/', async (_request, response) => {
  response.json({ version })
})
routes.use(aboutRoutes)
routes.use(contactRoutes)
routes.use(projectsRoutes)
routes.use(skillsRoutes)

export { routes }
