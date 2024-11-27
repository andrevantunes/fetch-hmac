export const generateMsResponse =
  rawResponse =>
  ({ data, meta, links }) => ({
    data,
    meta,
    links,
    status: rawResponse.status,
    headers: parseResponseHeaders(rawResponse.headers),
  })

export const parseResponseHeaders = headers => {
  if (!headers) return undefined
  if (!headers._headers) return getHeadersFromEntries(headers.entries())
  return Object.entries(headers._headers).reduce(
    (parsedHeaders, [key, value]: any) => ({
      ...parsedHeaders,
      [key]: value.join(','),
    }),
    {}
  )
}

const getHeadersFromEntries = entries => {
  let obj = {}
  let entry = entries.next()

  while (entry.done === false) {
    const val = entry.value
    obj[val[0]] = val[1]
    entry = entries.next()
  }
  return obj
}
