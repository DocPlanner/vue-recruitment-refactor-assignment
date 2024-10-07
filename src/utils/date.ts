import { addDays, addWeeks, format, isAfter, startOfDay, startOfWeek } from 'date-fns'

export const getClosestLastMonday = (referenceDate: Date) => {
  const closestPastMonday = startOfWeek(referenceDate, { weekStartsOn: 2 })

  const formattedDate = format(closestPastMonday, 'yyyyMMdd')

  return formattedDate
}

export const getClosestNextMonday = (referenceDate: Date) => {
  const startOfNextWeek = startOfWeek(addWeeks(referenceDate, 1), { weekStartsOn: 6 })

  return format(startOfNextWeek, 'yyyyMMdd')
}

export const isDateAfterTomorrow = (dateString: string) => {
  const today = new Date()
  const referenceDate = new Date(dateString)
  const tomorrow = addDays(startOfDay(today), 1)
  const dayAfterTomorrow = addDays(tomorrow, 1)
  return isAfter(referenceDate, dayAfterTomorrow)
}
