import { PathItemObject } from "openapi3-ts/dist/oas30";
import { NoContent } from "../../responses/NoContent";
import { GetAboutPageSwaggerResponse } from "../responses/GetAboutPage";
import { CreateAboutPageSwaggerSchema } from "../resquests/CreateAboutPage";
import { UpdateAboutPageSwaggerSchema } from "../resquests/UpdateAboutPage";

export const aboutPath: PathItemObject = {
  get: {
    tags: ["About Page"],
    responses: GetAboutPageSwaggerResponse
  },
  post: {
    tags: ["About Page"],
    description: "Cadastra dados da página sobre",
    responses: NoContent,
    requestBody: CreateAboutPageSwaggerSchema
  },
  patch: {
    tags: ["About Page"],
    description: "Atualiza dados da página sobre",
    responses: NoContent,
    requestBody: UpdateAboutPageSwaggerSchema
  },
  delete: {
    tags: ["About Page"],
    description: "Apaga todos os dados da página sobre",
    responses: NoContent,
  }
}