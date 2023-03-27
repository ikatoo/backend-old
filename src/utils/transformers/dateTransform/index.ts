const stringToDate = (stringDate: string): Date => {
  const arrayDate = stringDate.split(' - ')
  const year = parseInt(arrayDate[0])
  const monthIndex = parseInt(arrayDate[1]) - 1

  return new Date(year, monthIndex)
}

const dateToString = (date: Date): string => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1

  return `${year} - ${month.toString().padStart(2, '0')}`
}

const numberToDate = (date: number): Date => {
  return new Date(date)
}

const dateToNumber = (date: Date): number => {
  const dateNumber = new Date(date.getFullYear(), date.getMonth()).getTime()

  return dateNumber
}

const dateStringToNumber = (date: string): number => {
  const arrayDate = date.split('-')
  const dateNumber = new Date(parseInt(arrayDate[0]), parseInt(arrayDate[1]) - 1).getTime()

  return dateNumber
}

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