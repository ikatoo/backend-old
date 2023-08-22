import { expressAdapter } from "@/infra/http/adapters/expressAdapter"
import { authentication } from "@/infra/http/controllers/auth/authController"
import { Router } from "express"
import verifyTokenMiddleware from "../../middlewares/verifyTokenMiddleware"

const authRoutes = Router()

authRoutes.put('/auth/?*', (_request, response) => response.status(405).send())

authRoutes.post(
  '/auth/verify-token',
  verifyTokenMiddleware,
  (_request, response) => response.status(204).send()
)

authRoutes.post(
  '/auth/sign-in',
  expressAdapter(authentication)
)

export { authRoutes }
