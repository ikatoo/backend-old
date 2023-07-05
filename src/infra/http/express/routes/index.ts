import { Router } from 'express'
import 'express-async-errors'
import { readFile } from 'fs/promises'
import { aboutRoutes } from './about'
import { contactRoutes } from './contactPage'
import { projectsRoutes } from './projectsPage'
import { skillsRoutes } from './skillsPage'
import { imageRoutes } from './image'

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

export { routes }
