declare type HandlerResponse = {
  error?: string
  statusCode?: number
  body?: object
}

declare type HandlerProps = {
  id?: number
  page?: unknown
}

declare type HandlerFunction = (handlerProps?: HandlerProps) => Promise<HandlerResponse>
