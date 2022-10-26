const dayjs = require('dayjs')

function formatTime(time: number) {
  return dayjs(time).format('YYYY-MM-DD HH:mm:ss')
}

module.exports = {
  formatTime
}
