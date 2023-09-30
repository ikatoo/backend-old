import { ResponsesObject } from "openapi3-ts/dist/oas30";
import { ImageSwaggerSchema } from "../ImageSchema";

export const GetImageSwaggerResponse: ResponsesObject = {
  "200": {
    description: "Retorna dados da imagem",
    content: {
      "application/json": {
        schema: ImageSwaggerSchema,
        examples: {
          "Image": {
            value: {
              url: "https://domain.com/image.jpg",
            }
          }
        }
      }
    }
  }
}