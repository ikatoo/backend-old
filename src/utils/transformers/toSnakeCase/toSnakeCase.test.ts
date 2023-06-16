import { describe, expect, test } from "vitest"
import { toSnakeCase } from "."

describe('toSnakeCase:', () => {
  test('should transform camelCase', () => {
    const original = 'thiIsCamelCase'
    const result = toSnakeCase(original)
    const expected = 'thi_is_camel_case'

    expect(result).toEqual(expected)
  })

  test('should transform word with capital letters in sequence', () => {
    const original = 'thiIsCC'
    const result = toSnakeCase(original)
    const expected = 'thi_is_cc'

    expect(result).toEqual(expected)
  })
})