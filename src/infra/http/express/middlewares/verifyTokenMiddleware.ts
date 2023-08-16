import { verifyToken } from "@/infra/http/controllers/auth/authController"
import { UnauthorizedError } from "@/utils/httpErrors"
import { NextFunction, Request, Response } from "express"

export default async (request: Request, response: Response, next: NextFunction) => {
  const { authorization } = request.headers
  const token = authorization?.replace('Bearer ', '')
  try {
    await verifyToken({ parameters: { token } })
    next()
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      const { message, statusCode } = error
      return response.status(statusCode).json({ message })
    }
  }
}