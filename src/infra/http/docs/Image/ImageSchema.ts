import { SchemaObject } from "openapi3-ts/dist/oas30"

export const ImageSwaggerSchema: SchemaObject = {
  type: "object",
  properties: {
    "publicId": {
      type: "string"
    }
  },
  required: ["publicId"]
}
