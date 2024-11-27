export const getAllCookies = () => {
  if (typeof document !== 'object') return {}
  if (typeof document.cookie === 'object') return document.cookie
  if (typeof document.cookie !== 'string') return {}
  const Cookies = require('js-cookie')
  return Cookies.get()
}

export const getCookie = (name: string) => getAllCookies()[name]
