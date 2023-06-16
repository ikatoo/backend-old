import { describe, expect, test } from "vitest";
import { getFieldsWithValues } from ".";

describe('getFieldsWithValues:', () => {
  test('should get empty object and return a empty array', () => {
    const result = getFieldsWithValues({});
    expect(result).toEqual([])
  })

  test('should get a object with simple item', () => {
    const page = { name: 'John Doe' };
    const result = getFieldsWithValues(page);
    const expected = ["name = 'John Doe'"]

    expect(result).toEqual(expected)
  })

  test('should get a object with many itens', () => {
    const page = {
      name: 'John Doe',
      age: 25,
      email: 'johndoe@example.com'
    };
    const result = getFieldsWithValues(page);
    const expected = ["name = 'John Doe'", "age = '25'", "email = 'johndoe@example.com'"]

    expect(result).toEqual(expected)
  })

  test('should get a object with object', () => {
    const page = {
      name: 'John Doe',
      address: {
        street: '123 Main St',
        city: 'Example City',
        country: 'Example Country'
      }
    };
    const result = getFieldsWithValues(page);
    const expected = ["name = 'John Doe'", `address = '{"address": {"street":"123 Main St","city":"Example City","country":"Example Country"}}'`]

    expect(result).toEqual(expected)
  })

  test('should get a object with null value', () => {
    const page = {
      name: 'John Doe',
      age: null
    };
    const result = getFieldsWithValues(page);
    const expected = ["name = 'John Doe'", "age = 'null'"]

    expect(result).toEqual(expected)
  })
})