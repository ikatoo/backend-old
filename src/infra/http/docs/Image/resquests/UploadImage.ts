import { RequestBodyObject } from "openapi3-ts/dist/oas30";
import { ImageSwaggerSchema } from "../ImageSchema";

export const UploadImageSwaggerSchema: RequestBodyObject = {
  content: {
    "application/json": {
      schema: ImageSwaggerSchema,
      examples: {
        "Image": {
          value: {
            path: "directory/image.jpg",
          },
        }
      }
    }
  }
}