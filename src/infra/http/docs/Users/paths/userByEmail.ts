import { PathItemObject } from "openapi3-ts/dist/oas30";
import { UserByEmailSwaggerResponse } from "../responses/UserByEmail";

export const userByEmailPath: PathItemObject = {
  get: {
    tags: ["User"],
    description: "Pega usuário por email",
    responses: UserByEmailSwaggerResponse,
  },
}