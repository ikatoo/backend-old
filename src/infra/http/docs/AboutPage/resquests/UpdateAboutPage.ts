import { RequestBodyObject } from "openapi3-ts/dist/oas30";
import { AboutPagePartialSwaggerSchema } from "../AboutPageSchema";

export const UpdateAboutPageSwaggerSchema: RequestBodyObject = {
  content: {
    "application/json": {
      schema: AboutPagePartialSwaggerSchema,
      examples: {
        "AboutPage without optional fields": {
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
          },
        },
        "AboutPage": {
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
            ],
            illustrationURL: "http://domain.com/image.jpg",
            illustrationALT: "this is a illustration"
          }
        }
      }
    }
  }
}