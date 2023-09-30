import { PathItemObject } from "openapi3-ts/dist/oas30";
import { UsersByNameSwaggerResponse } from "../responses/UsersByName";

export const usersByNamePath: PathItemObject = {
  get: {
    tags: ["User"],
    description: "Lista usuários por nome",
    responses: UsersByNameSwaggerResponse,
  },
}