import { PathItemObject } from "openapi3-ts/dist/oas30";

export const verifyTokenPath: PathItemObject = {
  post: {
    tags: ["Auth"],
    description: "Verifica o token do usuário",
    responses: {}
  },
}