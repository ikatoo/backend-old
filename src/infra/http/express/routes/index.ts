import { Router } from 'express'
import 'express-async-errors'
import { readFile } from 'fs/promises'
import { aboutRoutes } from './about'
import { authRoutes } from './auth'
import { contactRoutes } from './contactPage'
import { imageRoutes } from './image'
import { projectsRoutes } from './projectsPage'
import { skillsRoutes } from './skillsPage'
import { usersRoutes } from './users'

const routes = Router()

routes.get('/', async (_request, response) => {
  const packageString = await readFile('./package.json')
  const packageJson = JSON.parse(packageString.toString('utf-8'))
  response.json({ version: packageJson.version })
})
routes.use(aboutRoutes)
routes.use(contactRoutes)
routes.use(projectsRoutes)
routes.use(skillsRoutes)
routes.use(imageRoutes)
routes.use(usersRoutes)
routes.use(authRoutes)

export { routes }
