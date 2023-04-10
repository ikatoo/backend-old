import { Request, ResponseToolkit } from "@hapi/hapi"

export default (handler: HandlerFunction) => {
  const hapiHandler = async (request: Request, h: ResponseToolkit) => {
    const { statusCode, error, body } = await handler({ page: request.payload })
    if (error) {
      return statusCode
        ? h.response({ error }).code(statusCode)
        : h.response({ error })
    }

    return statusCode
      ? h.response({ body }).code(statusCode)
      : h.response({ body })
  }

  return hapiHandler
}
