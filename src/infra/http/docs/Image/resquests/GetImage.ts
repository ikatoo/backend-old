import { RequestBodyObject } from "openapi3-ts/dist/oas30";
import { ImageSwaggerSchema } from "../ImageSchema";

export const GetImageSwaggerSchema: RequestBodyObject = {
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