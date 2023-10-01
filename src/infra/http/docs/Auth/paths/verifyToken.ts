import { PathItemObject } from "openapi3-ts/dist/oas30";
import bearerAuth from "../bearerAuth";

export const verifyTokenPath: PathItemObject = {
  post: {
    tags: ["Auth"],
    security: bearerAuth,
    description: "Verifica o token do usuário",
    responses: {}
  },
}