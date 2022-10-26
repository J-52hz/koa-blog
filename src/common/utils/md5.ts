const crypto = require('crypto')

export default async function md5password(password: string) {
  const result = crypto.createHash('md5').update(password).digest('hex')
  return result
}
