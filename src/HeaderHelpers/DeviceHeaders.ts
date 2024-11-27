import 'cross-fetch/polyfill'
import { hasInfo, getUserAgent, UserAgent } from '../DeviceInfo'

export const addDate = headers => {
  const date = new Date().toUTCString()
  const headersWithDate = { ...headers, 'X-DATE': date }
  return { date, headersWithDate }
}

export const addClient = (headers = {}, envs: any = {}) => {
  return {
    ...headers,
    CLIENT: envs.CLIENT,
    'Content-Type': 'application/json',
  }
}

export const addDevice = (headers = {}, envs = {}) => {
  if (!hasInfo(envs)) return headers
  const { platform, device, browser, source } = (getUserAgent(envs) as UserAgent) || {}
  return {
    ...headers,
    Platform: platform,
    Device: device,
    Browser: browser,
    'User-Agent': source,
  }
}
