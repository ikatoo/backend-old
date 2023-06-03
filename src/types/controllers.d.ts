declare type HandlerResponse = {
  // error?: string
  statusCode?: number
  body?: object
}

declare type HandlerProps = {
  parameters?: unknown
}

declare type ControllerResponse = Promise<HandlerResponse | void>

declare type HandlerFunction = (handlerProps?: HandlerProps) => ControllerResponse
