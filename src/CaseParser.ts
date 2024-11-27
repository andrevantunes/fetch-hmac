export const camelcase = (str: string) => {
  return str
    .replace(/_/g, ' ')
    .replace(/-/g, ' ')
    .replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match, index, xxx) => {
      if (index > 0 && xxx.substr(index - 1, 1) === '$') return match
      if (+match === 0) return ''
      return match[index === 0 ? 'toLowerCase' : 'toUpperCase']()
    })
}

const snakecaseToCamelcaseObjectFieldsReducer = (newObj, entry) => {
  const key = camelcase(entry[0])
  const value = entry[0] === 'className' ? entry[1] : snakecaseToCamelcaseObjectFields(entry[1])
  return { ...newObj, [key]: value }
}

export const snakecaseToCamelcaseObjectFields = (data: any) => {
  if (!data || typeof data !== 'object') return data

  if (Array.isArray(data)) return data.map(d => snakecaseToCamelcaseObjectFields(d))

  return Object.entries(data).reduce(snakecaseToCamelcaseObjectFieldsReducer, {})
}

export const camelcaseObjectFields = data => {
  if (!data || typeof data !== 'object') return data
  if (Array.isArray(data)) return data.map(d => camelcaseObjectFields(d))
  return Object.entries(data).reduce(
    (newObj, entry) => ({
      ...newObj,
      [camelcase(entry[0])]: camelcaseObjectFields(entry[1]),
    }),
    {}
  )
}

export const snakecase = (input: string) => {
  const str = input.trim().replace(/\s+/g, ' ')
  let result = ''
  for (const char of str) {
    if (char === ' ' || char === '-') result += '_'
    else if (!/[A-Z]/.test(char)) result += char
    else if (!result) result += char.toLowerCase()
    else result += `_${char.toLowerCase()}`
  }
  return result.replace(/_+/g, '_')
}

export const snakecaseObjectFields = data => {
  if (!data || typeof data !== 'object') return data
  if (Array.isArray(data)) return data.map(snakecaseObjectFields)
  return Object.entries(data).reduce(
    (newObj, entry) => ({
      ...newObj,
      [snakecase(entry[0])]: snakecaseObjectFields(entry[1]),
    }),
    {}
  )
}
