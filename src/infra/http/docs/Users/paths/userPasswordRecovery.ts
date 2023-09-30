import { PathItemObject } from "openapi3-ts/dist/oas30";
import { NoContent } from "../../responses/NoContent";
import { PasswordRecoverySwaggerSchema } from "../resquests/PasswordRecovery";

export const userPasswordRecoveryPath: PathItemObject = {
  get: {
    tags: ["User"],
    description: "Envia um email para o usuário com a nova senha",
    responses: NoContent,
    requestBody: PasswordRecoverySwaggerSchema
  },
}