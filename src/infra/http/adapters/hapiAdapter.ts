import { Request, ResponseToolkit } from "@hapi/hapi"

export default (handler: HandlerFunction) => {
  const hapiHandler = async (request: Request, h: ResponseToolkit) => {
    const page = typeof request.payload === "object"
      ? { ...request.payload, ...request.params }
      : request.params
    const { statusCode, error, body } = await handler({ parameters: page })
    if (error) {
      return statusCode
        ? h.response({ error }).code(statusCode)
        : h.response({ error })
    }

    return statusCode
      ? h.response(body).code(statusCode)
      : h.response(body)
  }

  return hapiHandler
}
