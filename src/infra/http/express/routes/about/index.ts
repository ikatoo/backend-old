import { expressAdapter } from '@/infra/http/adapters/expressAdapter'
import { createAboutPageHandler, deleteAboutPageHandler, getAboutPageHandler, updateAboutPageHandler } from '@/infra/http/controllers/aboutPage/aboutPageController'
import { Router } from 'express'
import verifyTokenMiddleware from '../../middlewares/verifyTokenMiddleware'

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
  verifyTokenMiddleware,
  expressAdapter(createAboutPageHandler)
)

aboutRoutes.patch(
  '/about',
  verifyTokenMiddleware,
  expressAdapter(updateAboutPageHandler)
)

aboutRoutes.delete(
  '/about',
  verifyTokenMiddleware,
  expressAdapter(deleteAboutPageHandler)
)

export {
  aboutRoutes
}
