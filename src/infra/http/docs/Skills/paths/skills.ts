import { PathItemObject } from "openapi3-ts/dist/oas30";
import { NoContent } from "../../responses/NoContent";
import { GetSkillsPageSwaggerResponse } from "../responses/GetSkillsPage";
import { CreateSkillsPageSwaggerSchema } from "../resquests/CreateSkillsPage";
import { UpdateSkillsPageSwaggerSchema } from "../resquests/UpdateSkillsPage";

export const skillsPath: PathItemObject = {
  get: {
    description: "Pega os dados da página Habilidades.",
    tags: ['Skills Page'],
    responses: GetSkillsPageSwaggerResponse
  },
  post: {
    description: "Cria os dados da página Habilidades.",
    tags: ['Skills Page'],
    responses: NoContent,
    requestBody: CreateSkillsPageSwaggerSchema
  },
  patch: {
    description: "Atualiza os dados da página Habilidades.",
    tags: ['Skills Page'],
    responses: NoContent,
    requestBody: UpdateSkillsPageSwaggerSchema
  },
  delete: {
    description: "Apaga os dados da página Habilidades",
    tags: ['Skills Page'],
    responses: NoContent,
  },
}