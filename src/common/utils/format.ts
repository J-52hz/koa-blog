import dayjs from 'dayjs'

export function formatTime(time: number) {
  return dayjs(time).format('YYYY-MM-DD HH:mm:ss')
}
