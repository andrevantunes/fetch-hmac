export const ensureSlashBefore = (value: string) => {
  const str = value.toString()
  const startsWithSlash = str.substr(0, 1) === '/'
  return startsWithSlash ? str : '/' + str
}

export const ensureNotSlashAfter = (value: string) => {
  const str = value.toString()
  const endsWithSlash = str.substr(str.length - 1, 1) === '/'
  return endsWithSlash ? str.substr(0, str.length - 1) : str
}
