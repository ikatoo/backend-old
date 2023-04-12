import { expressAdapter } from '@/infra/http/adapters/expressAdapter'
import { createAboutPageHandler, getAboutPageHandler } from '@/infra/http/controllers/aboutPage/aboutPageController'
import { Router } from 'express'

const aboutRoutes = Router()

aboutRoutes.put(
  '/about',
  (_request, response) => {
    return response.status(405).send()
  }
)

aboutRoutes.get(
  '/about',
  expressAdapter(getAboutPageHandler)
)

aboutRoutes.post(
  '/about',
  expressAdapter(createAboutPageHandler)
)

export {
  aboutRoutes
}