import { PathItemObject } from "openapi3-ts/dist/oas30";
import { ProjectsSwaggerSchema } from "../ProjectSchema";

export const projectsPath: PathItemObject = {
  "get": {
    tags: [
      "Projects"
    ],
    responses: {
      "200": {
        description: "Retorna todos os projetos",
        content: {
          "application/json": {
            schema: ProjectsSwaggerSchema,
            examples: {
              "Projects": {
                value: [
                  {
                    snapshot: "/images/snap-calm.png",
                    description: {
                      title: "Calm Organizador de Criptomoedas",
                      subTitle: "Last update: 2022 - 03",
                      content: "Personal project for learn nextjs."
                    },
                    githubLink: "https://github.com/mckatoo/calm"
                  },
                  {
                    snapshot: "/images/ikatoo.png",
                    description: {
                      title: "iKatoo - Site pessoal",
                      subTitle: "Last update: 2022 - 08",
                      content: "Personal Web Site."
                    },
                    githubLink: "https://github.com/mckatoo/ikatoo-frontend"
                  }
                ]
              }
            }
          }
        }
      }
    }
  }
}