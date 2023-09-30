import { PathItemObject } from "openapi3-ts/dist/oas30";
import { NoContent } from "../../responses/NoContent";
import { CreateUserSwaggerSchema } from "../resquests/CreateUser";
import { CreateUserSwaggerResponse } from "../responses/CreateUser";
import { UpdateUserSwaggerSchema } from "../resquests/UpdateUser";

export const userPath: PathItemObject = {
  post: {
    tags: ["User"],
    description: "Cadastra dados do usuário",
    responses: CreateUserSwaggerResponse,
    requestBody: CreateUserSwaggerSchema
  },
  patch: {
    tags: ["User"],
    description: "Atualiza dados do usuário",
    responses: NoContent,
    requestBody: UpdateUserSwaggerSchema
  },
}