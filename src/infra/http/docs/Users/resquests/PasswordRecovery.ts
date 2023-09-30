import { RequestBodyObject } from "openapi3-ts/dist/oas30";

export const PasswordRecoverySwaggerSchema: RequestBodyObject = {
  content: {
    "application/json": {
      schema: {
        type: "object",
        properties: {
          email: {
            type: "string"
          }
        },
        required: ["email"]
      },
      example: {
        email: "user@email.com"
      },
    }
  },
}