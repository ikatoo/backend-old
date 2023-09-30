import { PathItemObject } from "openapi3-ts/dist/oas30";
import { NoContent } from "../../responses/NoContent";

export const userByIdPath: PathItemObject = {
  delete: {
    tags: ["User"],
    description: "Apaga o usuário",
    responses: NoContent,
  },
}