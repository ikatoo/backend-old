import { ResponsesObject } from "openapi3-ts/dist/oas30";
import { UserWithoutPasswordSwaggerSchema } from "../UserSchema";

export const GetUserSwaggerResponse: ResponsesObject = {
  "200": {
    description: "Retorna dados da página sobre",
    content: {
      "application/json": {
        schema: UserWithoutPasswordSwaggerSchema,
        examples: {
          "User": {
            value: {
              id: 7,
              name: "User Teste",
              email: "user@teste.com",
            }
          },
        }
      }
    }
  }
}