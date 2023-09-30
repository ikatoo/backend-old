import { RequestBodyObject } from "openapi3-ts/dist/oas30";
import { ImageSwaggerSchema } from "../ImageSchema";

export const DeleteImageSwaggerSchema: RequestBodyObject = {
  content: {
    "application/json": {
      schema: ImageSwaggerSchema,
      examples: {
        "Image": {
          value: {
            id: "directory/image.jpg",
          },
        }
      }
    }
  }
}