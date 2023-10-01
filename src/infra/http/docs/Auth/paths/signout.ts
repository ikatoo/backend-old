import { PathItemObject } from "openapi3-ts/dist/oas30";
import bearerAuth from "../bearerAuth";

export const signoutPath: PathItemObject = {
  post: {
    tags: ["Auth"],
    security: bearerAuth,
    description: "Autentica o usuário",
    responses: {}
  },
}