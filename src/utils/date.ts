const MONTHS_RU = [
  'января',
  'февраля',
  'марта',
  'апреля',
  'мая',
  'июня',
  'июля',
  'августа',
  'сентября',
  'октября',
  'ноября',
  'декабря'
]

const WEEKDAYS_RU = [
  'воскресенье',
  'понедельник',
  'вторник',
  'среда',
  'четверг',
  'пятница',
  'суббота'
]

interface FormattedDate {
  fullDate: string
  weekday: string
}

export function formatDateRu(dateString: string): FormattedDate {
  const date = new Date(dateString)
  const day = date.getDate()
  const month = MONTHS_RU[date.getMonth()]
  const year = date.getFullYear()
  const weekday = WEEKDAYS_RU[date.getDay()]
  
  return {
    fullDate: `${day} ${month}, ${year}`,
    weekday: weekday
  }
} 