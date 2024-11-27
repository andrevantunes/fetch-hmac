import { MD5, enc, HmacSHA1 } from 'crypto-js'
const { Base64 } = enc

export const encryptMD5 = (content: any, envs: any = {}) => {
  if (content === undefined || content === null || content === '') return ''
  content = JSON.stringify(content)
  if (content === '{}' || content === '[]') return ''
  return Base64.stringify(MD5(content, envs.HMAC_KEY))
}

export const getHmacSha1 = (content: any, envs: any = {}) => Base64.stringify(HmacSHA1(content, envs.HMAC_KEY))
