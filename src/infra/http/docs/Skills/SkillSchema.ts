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


export const SkillsPageSwaggerSchema: SchemaObject = {
  type: "object",
  properties: {
    title: { type: "string" },
    description: { type: "string" },
    skills: {
      type: "array",
      items: {
        properties: {
          skillTitle: { type: "string" }
        },
        required: ["skillTitle"]
      }
    },
    lastJobs: {
      type: "array",
      items: {
        properties: {
          jobTitle: { type: "string" },
          jobDescription: { type: "string" },
          yearMonthStart: { type: "string" },
          link: { type: "string" },
          yearMonthEnd: { type: "string" }
        },
        required: [
          "jobTitle",
          "jobDescription",
          "yearMonthStart",
          "link"
        ]
      }
    },
  },
  required: [
    "title",
    "description",
    "skills",
    "lastJobs",
  ]
}

export const SkillsPagePartialSwaggerSchema: SchemaObject = {
  ...SkillsPageSwaggerSchema,
  required: []
}

