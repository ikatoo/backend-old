export const toSnakeCase = (field: string) => {
  return field
    .replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase()
}
