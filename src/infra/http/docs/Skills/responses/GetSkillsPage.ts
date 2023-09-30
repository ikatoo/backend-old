import { ResponsesObject } from "openapi3-ts/dist/oas30";
import { SkillsPageSwaggerSchema } from "../SkillSchema";

export const GetSkillsPageSwaggerResponse: ResponsesObject = {
  "200": {
    description: "Retorna dados da página habilidades",
    content: {
      "application/json": {
        schema: SkillsPageSwaggerSchema,
        examples: {
          "SkillsPage without optional fields": {
            value: {
              title: "Olá. Bem vindo❗",
              description: "<p>Aqui vai uma descrição de exemplo</p><span>😄</span>",
              skills: [
                {
                  title: "docker"
                },
                {
                  title: "jest"
                },
                {
                  title: "tdd"
                }
              ]
            }
          },
          "SkillsPage": {
            "value": {
              title: "Olá. Bem vindo❗",
              description: "<p>Aqui vai uma descrição de exemplo</p><span>😄</span>",
              skills: [
                {
                  title: "docker"
                },
                {
                  title: "jest"
                },
                {
                  title: "tdd"
                }
              ],
              illustrationURL: "http://domain.com/image.jpg",
              illustrationALT: "this is a illustration"
            }
          }
        }
      }
    }
  }
}