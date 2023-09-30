import { RequestBodyObject } from "openapi3-ts/dist/oas30";
import { SkillsPagePartialSwaggerSchema } from "../SkillSchema";

export const UpdateSkillsPageSwaggerSchema: RequestBodyObject = {
  content: {
    "application/json": {
      schema: SkillsPagePartialSwaggerSchema,
      examples: {
        "SkillsPage": {
          value: {
            title: "Olá. Bem vindo❗",
            description: "<p>Aqui vai uma descrição de exemplo</p><span>😄</span>",
            skills: [
              {
                skillTitle: "docker"
              },
              {
                skillTitle: "jest"
              },
              {
                skillTitle: "tdd"
              }
            ],
            lastJobs: [
              {
                jobTitle: "Calm Organizador de Criptomoedas",
                jobDescription: "Projeto pessoal para estudo.",
                yearMonthStart: "2022 - 03",
                link: "https://github.com/mckatoo/calm"
              },
              {
                jobTitle: "Uniesi - Centro Universitário de Itapira",
                jobDescription: "Responsável pela infraestrutura local e suporte dos serviços dispostos pela mantenedora UNIP.",
                yearMonthStart: "2013 - 06",
                yearMonthEnd: "2021 - 07",
                link: "https://uniesi.edu.br"
              }
            ]
          },
        }
      }
    }
  }
}