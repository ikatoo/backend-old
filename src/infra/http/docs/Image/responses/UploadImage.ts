import { ResponsesObject } from "openapi3-ts/dist/oas30";
import { ImageSwaggerSchema } from "../ImageSchema";

export const UploadImageSwaggerResponse: ResponsesObject = {
  "201": {
    description: "Retorna dados da imagem após upload",
    content: {
      "application/json": {
        schema: ImageSwaggerSchema,
        examples: {
          "Image": {
            value: {
              url: "https://domain.com/image.jpg",
              publicId: "image.jpg"
            }
          }
        }
      }
    }
  }
}