import { Request, Response } from "express"

export const expressMulterAdapter = (handler: HandlerFunction) => {
  const expressHandler = async (request: Request, response: Response) => {
    const parameters = { file: request.file }
    const result = await handler({ parameters })
    if(!result) return
    const { statusCode, body } = result

    return statusCode
      ? response.status(statusCode).json(body)
      : response.json(body)
  }

  return expressHandler
}