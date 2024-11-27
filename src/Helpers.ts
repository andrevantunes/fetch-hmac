export const clearObject = (object = {}) => {
  return Object.entries(object).reduce((acc, [key, value]) => {
    if (value) acc[key] = value
    return acc
  }, {})
}
