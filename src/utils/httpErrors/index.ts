export class HttpError extends Error {
  public readonly statusCode: number

  constructor(message: string, statusCode: number) {
    super(message)
    this.statusCode = statusCode
  }
}

export class BadRequestError extends HttpError {
  constructor(message: string) {
    super(message, 400)
  }
}

export class NotFoundError extends HttpError {
  constructor (message: string) {
    super(message, 404)
  }
}

export class UnauthorizedError extends HttpError {
  constructor (message: string) {
    super(message, 401)
  }
}

export class ConflictError extends HttpError {
  constructor (message: string) {
    super(message, 409)
  }
}

export class InternalError extends HttpError {
  constructor () {
    super('Internal Server Error', 500)
  }
}