import { SchemaObject } from "openapi3-ts/dist/oas30"
import { SkillSwaggerSchema } from "../Skills/SkillSchema"

export const AboutPageSwaggerSchema: SchemaObject = {
  type: "object",
  properties: {
    "title": {
      type: "string"
    },
    "description": {
      type: "string"
    },
    "skills": {
      type: "array",
      items: {
        type: "array",
        items: SkillSwaggerSchema
      }
    },
    "illustrationURL": {
      type: "string"
    },
    "illustrationALT": {
      type: "string"
    }
  },
  required: ["title", "description", "skills"]
}

export const AboutPagePartialSwaggerSchema: SchemaObject = {
  ...AboutPageSwaggerSchema,
  required: []
}
