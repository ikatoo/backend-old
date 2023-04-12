import { Request, Response } from "express"

export const expressAdapter = (handler: HandlerFunction) => {
  const expressHandler = async (request: Request, response: Response) => {
    const parameters = { ...request.body, ...request.params }
    const { statusCode, error, body } = await handler({ parameters })
    if (error) {
      return statusCode
        ? response.status(statusCode).json({ error })
        : response.json({ error })
    }

    return statusCode
      ? response.status(statusCode).json(body)
      : response.json(body)
  }

  return expressHandler
}