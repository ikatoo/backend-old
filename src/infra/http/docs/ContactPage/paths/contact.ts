import { PathItemObject } from "openapi3-ts/dist/oas30";
import { ContactPagePartialSwaggerSchema, ContactPageSwaggerSchema } from "../ContactPageSchema";
import bearerAuth from "../../Auth/bearerAuth";

export const contactPath: PathItemObject = {
  get: {
    tags: [
      "Contact Page"
    ],
    responses: {
      "200": {
        description: "Retorna dados da página de contato",
        content: {
          "application/json": {
            schema: ContactPageSwaggerSchema,
            examples: {
              "ContactPage": {
                value: {
                  title: "Entre em contato 😄",
                  description: "Avisos ou comentários.",
                  localization: {
                    lat: -22.428850083857423,
                    lng: -46.830700405308185
                  },
                  email: "seu@email.com"
                }
              }
            }
          }
        }
      }
    }
  },
  "post": {
    tags: [
      "Contact Page"
    ],
    security: bearerAuth,
    description: "Cadastra dados da página de contato",
    responses: {
      "204": {
        description: "Não retorna nada"
      }
    },
    requestBody: {
      content: {
        "application/json": {
          schema: ContactPageSwaggerSchema,
          examples: {
            "AboutPage without optional fields": {
              value: {
                title: "Entre em contato 😄",
                description: "Estou interessado em oportunidades CLT, mas não descarto nenhum tipo de trabalho desde que me traga oportunidades de aprendizado. No entanto, se você tiver outra solicitação ou pergunta, não hesite em enviar um email. <a href=\"mailto:mckatoo@gmail.com?Subject=Contato%20pelo%20site\">mckatoo@gmail.com</a>",
                localization: {
                  lat: -22.428850083857423,
                  lng: -46.830700405308185
                },
                email: "mckatoo@gmail.com"
              }
            }
          }
        }
      }
    }
  },
  "patch": {
    tags: [
      "Contact Page"
    ],
    security: bearerAuth,
    description: "Atualiza dados da página de contato",
    responses: {
      "204": {
        description: "Não retorna nada"
      }
    },
    requestBody: {
      content: {
        "application/json": {
          schema: ContactPagePartialSwaggerSchema,
          examples: {
            "ContactPage": {
              value: {
                title: "Entre em contato 😄",
                description: "Estou interessado em oportunidades CLT, mas não descarto nenhum tipo de trabalho desde que me traga oportunidades de aprendizado. No entanto, se você tiver outra solicitação ou pergunta, não hesite em enviar um email. <a href=\"mailto:mckatoo@gmail.com?Subject=Contato%20pelo%20site\">mckatoo@gmail.com</a>",
                localization: {
                  lat: -22.428850083857423,
                  lng: -46.830700405308185
                },
                email: "mckatoo@gmail.com"
              }
            }
          }
        }
      }
    }
  },
  "delete": {
    tags: [
      "Contact Page"
    ],
    security: bearerAuth,
    description: "Apaga dados da página de contato",
    responses: {
      "204": {
        description: "Não retorna nada"
      }
    }
  }
}