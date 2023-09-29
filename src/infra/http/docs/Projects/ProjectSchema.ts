import { SchemaObject } from "openapi3-ts/dist/oas30";

export const ProjectSwaggerSchema: SchemaObject = {
  type: "object",
  properties: {
    "snapshot": {
      type: "string"
    },
    "description": {
      type: "object",
      properties: {
        "title": {
          type: "string"
        },
        "subTitle": {
          type: "string"
        },
        "content": {
          type: "string"
        }
      }
    },
    "githubLink": {
      type: "string"
    }
  }
}

export const ProjectsSwaggerSchema: SchemaObject = {
  type: "array",
  items: ProjectSwaggerSchema
}