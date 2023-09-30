import { ResponsesObject } from "openapi3-ts/dist/oas30";
import { CreateUserSwaggerSchema, UserSwaggerSchema } from "../UserSchema";

export const CreateUserSwaggerResponse: ResponsesObject = {
  "201": {
    description: "Retorna dados sobre usuário criado.",
    content: {
      "application/json": {
        schema: CreateUserSwaggerSchema,
        examples: {
          "User": {
            value: {
              accessToken: "a-valid-access-token",
            }
          }
        }
      }
    }
  }
}