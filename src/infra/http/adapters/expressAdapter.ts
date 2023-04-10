import { Request, Response } from "express"

export default class ExpressAdapter {
  static create(handler: HandlerFunction) {
    const expressHandler = async (request: Request, response: Response) => {
      if (!request.body) return response.status(400)
      const { statusCode } = await handler(request.body)

      return statusCode
        ? response.status(statusCode)
        : response.send()
    }

    return expressHandler
  }

  static get(handler: HandlerFunction) {
    const expressHandler = async (_request: Request, response: Response) => {
      const { statusCode, body } = await handler()
      if (!body) return response.status(204).send()
      return statusCode
        ? response.status(statusCode).json(body)
        : response.json(body)

      // if (!request.body) return response.status(400)
      // const { statusCode } = await handler(request.body)

      // return statusCode 
      // ? response.status(statusCode)
      // : response.send()
    }

    return expressHandler
  }
}