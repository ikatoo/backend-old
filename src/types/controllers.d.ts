declare type HandlerResponse = {
  error?: string
  statusCode?: number
  body?: object
}

declare type HandlerProps = {
  parameters?: unknown
}

declare type HandlerFunction = (handlerProps?: HandlerProps) => Promise<HandlerResponse>
