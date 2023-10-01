import { PathItemObject } from "openapi3-ts/dist/oas30";
import { NoContent } from "../../responses/NoContent";
import bearerAuth from "../../Auth/bearerAuth";

export const userByIdPath: PathItemObject = {
  delete: {
    tags: ["User"],
    security: bearerAuth,
    description: "Apaga o usuário",
    responses: NoContent,
  },
}