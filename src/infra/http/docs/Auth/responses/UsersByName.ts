import { ResponsesObject } from "openapi3-ts/dist/oas30";
import { UsersWithoutPassword } from "../UserSchema";

export const UsersByNameSwaggerResponse: ResponsesObject = {
  "200": {
    description: "Lista usuários por nome",
    content: {
      "application/json": {
        schema: UsersWithoutPassword,
        examples: {
          "Users": {
            value: [
              {
                id: 7,
                name: "User Teste",
                email: "user@teste.com",
              },
              {
                id: 27,
                name: "User2 Teste",
                email: "user2@teste.com",
              },
              {
                id: 73,
                name: "User3 Teste",
                email: "user3@teste.com",
              },
            ]
          },
        }
      }
    }
  }
}