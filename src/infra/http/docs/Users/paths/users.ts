import { PathItemObject } from "openapi3-ts/dist/oas30";
import { ListUsersSwaggerResponse } from "../responses/ListUsers";

export const usersPath: PathItemObject = {
  get: {
    tags: ["User"],
    description: "Lista todos os usuários",
    responses: ListUsersSwaggerResponse,
  },
}