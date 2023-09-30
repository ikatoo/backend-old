import { SchemaObject } from "openapi3-ts/dist/oas30"

export const UserWithoutPasswordSwaggerSchema: SchemaObject = {
  type: "object",
  properties: {
    "name": {
      type: "string"
    },
    "email": {
      type: "string"
    }
  },
  required: ["title", "description", "skills"]
}

export const UserWithoutIdSwaggerSchema: SchemaObject = {
  type: "object",
  properties: {
    ...UserWithoutPasswordSwaggerSchema.properties,
    "password": {
      type: "string"
    }
  },
  required: [
    "name",
    "email",
    "password"
  ]
}

export const UserSwaggerSchema: SchemaObject = {
  type: "object",
  properties: {
    ...UserWithoutPasswordSwaggerSchema.properties,
    "id": {
      type: "number",
    },
    "password": {
      type: "string"
    }
  },
  required: [
    "name",
    "email",
    "password"
  ]
}

export const UserPartialSwaggerSchema: SchemaObject = {
  ...UserSwaggerSchema,
  required: []
}

export const CreateUserSwaggerSchema: SchemaObject = {
  type: "object",
  properties: {
    "accessToken": {
      type: "string",
    },
  },
}

export const UsersWithoutPassword: SchemaObject = {
  type: "array",
  items: {
    properties: UserWithoutPasswordSwaggerSchema.properties
  }
}
