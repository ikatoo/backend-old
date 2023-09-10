import { expressAdapter } from "@/infra/http/adapters/expressAdapter"
import { authentication, signout, verifyToken } from "@/infra/http/controllers/auth/authController"
import { Router } from "express"

const authRoutes = Router()

authRoutes.put('/auth/?*', (_request, response) => response.status(405).send())

authRoutes.post(
  '/auth/verify-token',
  expressAdapter(verifyToken)
)

authRoutes.post(
  '/auth/sign-in',
  expressAdapter(authentication)
)

authRoutes.post(
  '/auth/sign-out',
  expressAdapter(signout)
)

export { authRoutes }
