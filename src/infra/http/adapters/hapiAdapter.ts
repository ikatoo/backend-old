import { Request, ResponseToolkit } from "@hapi/hapi"

export default class HapiAdapter {
  static create(handler: AboutPageHandlerFunction) {
    const hapiHandler = async (request: Request, h: ResponseToolkit) => {
      if (!request.payload) return h.response().code(400)
      const { statusCode, error } = await handler({ page: request.payload })

      if (error) {
        return statusCode
          ? h.response({ error }).code(statusCode)
          : h.response({ error })
      }

      return statusCode
        ? h.response().code(statusCode)
        : h.response()
    }

    return hapiHandler
  }

  static get(handler: AboutPageHandlerFunction) {
    const hapiHandler = async (_request: Request, h: ResponseToolkit) => {
      const { statusCode, body, error } = await handler()
      if (error) {
        return statusCode
          ? h.response({ error }).code(statusCode)
          : h.response({ error }).code(204)
      }

      return statusCode
        ? h.response({ body }).code(statusCode)
        : h.response({ body })
    }

    return hapiHandler
  }

  static update(handler: AboutPageHandlerFunction) {
    const hapiHandler = async (request: Request, h: ResponseToolkit) => {
      if (!request.payload) return h.response().code(400)
      const { error, statusCode } = await handler({ page: request.payload })

      if (error) {
        return statusCode
          ? h.response({ error }).code(statusCode)
          : h.response({ error }).code(204)
      }

      return statusCode
        ? h.response().code(statusCode)
        : h.response()
    }

    return hapiHandler
  }

  static delete(handler: AboutPageHandlerFunction) {
    const hapiHandler = async (_request: Request, h: ResponseToolkit) => {
      const { statusCode, error } = await handler()
      if (error) {
        return statusCode
          ? h.response({ error }).code(statusCode)
          : h.response({ error }).code(204)
      }

      return statusCode
        ? h.response().code(statusCode)
        : h.response()
    }

    return hapiHandler
  }
}