/**
 * @param stringDate Ex: '2023 - 06'
 * @returns Ex: new Date(2023, 5)
 */
const stringToDate = (stringDate: string): Date => {
  const arrayDate = stringDate.split('-')
  const stringYear = arrayDate[0].split("")
    .map(_char => !Number.isNaN(parseInt(_char)) ? _char : undefined)
    .join('')
  const year = parseInt(stringYear)
  const monthIndex = parseInt(arrayDate[1]) - 1

  return new Date(year, monthIndex)
}

/**
 * @param date Ex: new Date(2023, 5)
 * @returns Ex: '2023 - 06'
 */
const dateToString = (date: Date): string => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1

  return `${year} - ${month.toString().padStart(2, '0')}`
}

/**
 * @param date Ex: 1685588400000
 * @returns Ex: new Date(2023, 5)
 */
const numberToDate = (date: number): Date => {
  return new Date(date)
}

/**
 * @param date Ex: new Date(2023, 5)
 * @returns Ex: 1685588400000
 */
const dateToNumber = (date: Date): number => {
  const dateNumber = new Date(date.getFullYear(), date.getMonth()).getTime()

  return dateNumber
}

/**
 * @param date Ex: '2023 - 06'
 * @returns Ex: 1685588400000
 */
const dateStringToNumber = (date: string): number => {
  const arrayDate = date.split('-')
  const dateNumber = new Date(parseInt(arrayDate[0]), parseInt(arrayDate[1]) - 1).getTime()

  return dateNumber
}

/**
 * @param numberDate Ex: 1685588400000
 * @returns Ex: '2023 - 06'
 */
const dateNumberToString = (numberDate: number): string => {
  const date = new Date(numberDate)
  const year = date.getFullYear()
  const month = date.getMonth() + 1

  return `${year} - ${month.toString().padStart(2, '0')}`
}

export {
  stringToDate,
  dateToString,
  numberToDate,
  dateToNumber,
  dateStringToNumber,
  dateNumberToString
}