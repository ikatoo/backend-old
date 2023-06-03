import { ConflictError, HttpError, InternalError } from "@/utils/httpErrors"
import { Request, ResponseToolkit } from "@hapi/hapi"

export default (handler: HandlerFunction) => {
  const hapiHandler = async (request: Request, h: ResponseToolkit) => {
    const parameters = typeof request.payload === "object"
      ? { ...request.payload, ...request.params }
      : request.params

    try {
      const result = await handler({ parameters })
      if (!result) throw new InternalError()
      const { statusCode, body } = result

      return statusCode
        ? h.response(body).code(statusCode)
        : h.response(body)
    } catch (error) {
      if (error instanceof HttpError) {
        const { message, statusCode } = error
        return h.response({ message }).code(statusCode)
      }
    }
  }

  return hapiHandler
}
