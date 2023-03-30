export default <T extends Record<string, unknown>>(obj: any, property: string): obj is T => {
  return property in obj
    && obj.hasOwnProperty(property)
    && typeof obj[property] === typeof ({} as T)[property];
}

