import { RequestBodyObject } from "openapi3-ts/dist/oas30";
import { UserSwaggerSchema } from "../UserSchema";

export const CreateUserSwaggerSchema: RequestBodyObject = {
  content: {
    "application/json": {
      schema: UserSwaggerSchema,
      examples: {
        "User": {
          value: {
            name: "User Teste",
            email: "user@teste.com",
            password: "senha-super-segura"
          }
        }
      }
    }
  }
}