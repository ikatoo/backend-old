import { SchemaObject } from "openapi3-ts/dist/oas30"

export const SkillSwaggerSchema: SchemaObject = {
  type: "object",
  properties: {
    "title": {
      type: "string"
    }
  },
  required: ["title"]
}
