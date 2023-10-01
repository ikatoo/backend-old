import { PathItemObject } from "openapi3-ts/dist/oas30";
import { ProjectSwaggerSchema } from "../ProjectSchema";
import bearerAuth from "../../Auth/bearerAuth";

export const projectByIdPath: PathItemObject = {
  "get": {
    tags: [
      "Projects"
    ],
    responses: {
      "200": {
        description: "Retorna o projeto com id específico",
        content: {
          "application/json": {
            schema: ProjectSwaggerSchema,
            examples: {
              "Project": {
                value: {
                  snapshot: "/images/snap-calm.png",
                  description: {
                    title: "Calm Organizador de Criptomoedas",
                    subTitle: "Last update: 2022 - 03",
                    content: "Personal project for learn nextjs."
                  },
                  githubLink: "https://github.com/mckatoo/calm"
                }
              }
            }
          }
        }
      }
    }
  },
  "patch": {
    tags: [
      "Projects"
    ],
    security: bearerAuth,
    responses: {
      "204": {
        description: "Não retorna nada"
      }
    },
    "requestBody": {
      content: {
        "application/json": {
          schema: ProjectSwaggerSchema,
          examples: {
            "Project": {
              value: {
                snapshot: "/images/snap-calm.png",
                description: {
                  title: "Calm Organizador de Criptomoedas",
                  subTitle: "Last update: 2022 - 03",
                  content: "Personal project for learn nextjs."
                },
                githubLink: "https://github.com/mckatoo/calm"
              }
            }
          }
        }
      }
    }
  },
  "delete": {
    tags: [
      "Projects"
    ],
    security: bearerAuth,
    responses: {
      "204": {
        description: "Não retorna nada"
      }
    }
  }
}