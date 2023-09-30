import { ResponsesObject } from "openapi3-ts/dist/oas30";
import { UserWithoutPasswordSwaggerSchema } from "../UserSchema";

export const ListUsersSwaggerResponse: ResponsesObject = {
  "200": {
    description: "Retorna todos os usuários",
    content: {
      "application/json": {
        schema: UserWithoutPasswordSwaggerSchema,
        examples: {
          "Users": {
            value: [
              {
                id: 7,
                name: "User Teste",
                email: "user@teste.com"
              },
              {
                id: 17,
                name: "User2 Teste",
                email: "user2@teste.com"
              },
              {
                id: 73,
                name: "User3 Teste",
                email: "user3@teste.com"
              },
            ]
          },
        }
      }
    }
  }
}