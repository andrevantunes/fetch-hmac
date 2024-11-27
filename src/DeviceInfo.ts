declare global {
  var req
}

export type UserAgent = {
  platform: string
  device: string
  browser: string
  source: string
  BROWSER?: string
}

export const hasInfo = (envs: any = {}): Boolean => hasServerRequest() || envs.BROWSER

export const getUserAgent = (envs?: Partial<UserAgent>): UserAgent | undefined => {
  if (!hasInfo(envs)) return undefined

  const source = userAgentSource()
  if (!source) return undefined
  try {
    const parseUserAgent = require('express-useragent').parse
    const parsedUserAgent = parseUserAgent(source)
    return {
      source: parsedUserAgent.source,
      platform: parsedUserAgent.platform,
      device: parsedUserAgent.os,
      browser: parsedUserAgent.browser + ' ' + parsedUserAgent.version,
    }
  } catch (e) {
    return undefined
  }
}

const hasServerRequest = () => typeof req === 'object'

const userAgentSource = () => (hasServerRequest() ? req.headers['user-agent'] : navigator.userAgent)
