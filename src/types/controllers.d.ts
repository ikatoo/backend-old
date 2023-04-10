declare type HandlerResponse = {
  error?: string
  statusCode?: number
  body?: object
}

declare type HandlerProps = {
  id?: number
  page?: unknown
}

declare type AboutPageHandlerFunction = (handlerProps?: HandlerProps) => Promise<HandlerResponse>
