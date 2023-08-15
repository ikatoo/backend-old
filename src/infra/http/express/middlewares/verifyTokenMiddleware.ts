import { NextFunction, Request, Response } from "express"
import { verifyToken } from "@/infra/http/controllers/auth/authController"

export default async (request: Request, _response: Response, next: NextFunction) => {
  const { authorization } = request.headers
  const token = authorization?.replace('Bearer ', '')
  await verifyToken({ parameters: { token } })

  next()
}