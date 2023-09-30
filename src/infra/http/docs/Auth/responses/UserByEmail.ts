import { ResponsesObject } from "openapi3-ts/dist/oas30";
import { UserWithoutPasswordSwaggerSchema } from "../UserSchema";

export const UserByEmailSwaggerResponse: ResponsesObject = {
  "200": {
    description: "Retorna usuário por email",
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