declare type HandlerResponse = {
  statusCode?: number
  body?: object
}

declare type HandlerProps<T = any> = {
  parameters?: { data?: T, authorization?: string }
}

declare type ControllerResponse = Promise<HandlerResponse | void>

declare type HandlerFunction = (handlerProps?: HandlerProps) => ControllerResponse
