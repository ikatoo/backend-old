import typeHasProperty from "../typeHasProperty"

export default <T extends Record<string, unknown>>(obj: object): boolean => {
  for (const key of Object.keys(obj)) {
    if (!typeHasProperty<T>(obj, key))
      return false
  }
  return true
}