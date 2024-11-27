import { getCookie } from '../Cookies'

export function addUtmParams(previousHeaders) {
  const utmList = ['utm_content', 'utm_medium', 'utm_source', 'utm_term', 'utm_campaign']
  return utmList.reduce((newHeaders, utmName) => setUtmHeader(newHeaders, utmName), previousHeaders)
}

function setUtmHeader(utmHeaders, cookieName: string) {
  if (!getCookie(cookieName)) return utmHeaders
  return {
    ...utmHeaders,
    [cookieName]: getCookie(cookieName),
  }
}
