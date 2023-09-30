import { RequestBodyObject } from "openapi3-ts/dist/oas30";
import { UserPartialSwaggerSchema } from "../UserSchema";

export const UpdateUserSwaggerSchema: RequestBodyObject = {
  content: {
    "application/json": {
      schema: UserPartialSwaggerSchema,
      examples: {
        "User": {
          value: {
            name: "Updated User",
            email: "user@teste.com",
            password: "a-new-password"
          },
        },
      }
    }
  }
}