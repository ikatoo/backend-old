import { describe, expect, test } from "vitest";
import { dateNumberToString, dateStringToNumber, dateToNumber, dateToString, numberToDate, stringToDate } from ".";

describe('dateTransform utils', () => {
  // mocked dates is equivalent at 2023 - 06
  const date = new Date(2023, 5)
  const dateNumber = date.getTime()
  const dateString = '2023 - 06'

  test('String => Date', () => {
    const actual = stringToDate(dateString)

    expect(date).toStrictEqual(actual)
  })

  test('Date => String', () => {
    const actual = dateToString(date)

    expect(dateString).toBe(actual)
  })

  test('Number => Date', () => {
    const actual = numberToDate(dateNumber)

    expect(date).toStrictEqual(actual)
  })

  test('Date => Number', () => {
    const actual = dateToNumber(date)

    expect(dateNumber).toBe(actual)
  })

  test('String => Number', () => {
    const actual = dateStringToNumber(dateString)

    expect(dateNumber).toBe(actual)
  })

  test('DateNumber => DateString', () => {
    const actual = dateNumberToString(dateNumber)

    expect(dateString).toEqual(actual)
  })
})