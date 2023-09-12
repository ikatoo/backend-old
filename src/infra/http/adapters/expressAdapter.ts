import { Request, Response } from "express"

export const expressAdapter = (handler: HandlerFunction) => {
  const expressHandler = async (request: Request, response: Response) => {
    const { authorization } = request.headers
    const data = { ...request.body, ...request.params }
    const result = await handler({ parameters: { data, authorization } })
    if (!result) return
    const { statusCode, body } = result

    return statusCode
      ? response.status(statusCode).json(body)
      : response.json(body)
  }

  return expressHandler
}