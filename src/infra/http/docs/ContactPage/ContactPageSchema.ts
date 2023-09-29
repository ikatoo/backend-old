import { SchemaObject } from "openapi3-ts/dist/oas30"

export const ContactPageSwaggerSchema: SchemaObject = {
  type: "object",
  properties: {
    "title": {
      type: "string"
    },
    "description": {
      type: "string"
    },
    "localization": {
      type: "object",
      "properties": {
        "lat": {
          type: "number"
        },
        "lng": {
          type: "number"
        }
      }
    },
    "email": {
      type: "string"
    }
  }
}

export const ContactPagePartialSwaggerSchema = {
  ...ContactPageSwaggerSchema,
  required: []
}
