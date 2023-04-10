import ExpressAdapter from '@/infra/http/adapters/expressAdapter'
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
  ExpressAdapter.get(getAboutPageHandler)
)

aboutRoutes.post(
  '/about',
  ExpressAdapter.create(createAboutPageHandler)
)

export {
  aboutRoutes
}
