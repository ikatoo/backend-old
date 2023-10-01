import { PathItemObject, ResponseObject } from "openapi3-ts/dist/oas30";

export const signinPath: PathItemObject = {
  post: {
    tags: ["Auth"],
    description: "Autentica o usuário",
    requestBody: {
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              email: {
                type: "string"
              },
              password: {
                type: "string"
              }
            }
          },
          example: {
            email: "teste@teste.com",
            password: "teste"
          }
        }
      }
    },
    responses: {
      "200": {
        description: "Usuário autenticado com sucesso",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                accessToken: {
                  type: "string"
                },
                user: {
                  type: "object",
                  properties: {
                    email: {
                      type: "string",
                    },
                    name: {
                      type: "string",
                    },
                    id: {
                      type: "number",
                    }
                  }
                },
              }
            }
          }
        }
      }
    }
  },
}