import { snakecaseToCamelcaseObjectFields } from './CaseParser'
import { generateMsResponse } from './MsResponse'
import { deserialize } from './JsonApi'

export const parseResponse = options => rawResponse =>
  getJsonResponse(rawResponse)
    .then(parseResponseByType(options.jsonApi))
    .then(generateMsResponse(rawResponse))
    .then(response => {
      if (options.disableCamelCase) return response
      return snakecaseToCamelcaseObjectFields(response)
    })
    .then(filterResponse(options, rawResponse.status))
    .then(parseError(rawResponse))

const getJsonResponse = rawResponse => {
  if (isNotAJsonRequest(rawResponse) || isANoContentRequest(rawResponse.status)) {
    return Promise.resolve({ results: null })
  }
  return rawResponse.json()
}

const isNotAJsonRequest = request => {
  const contentType = request.headers.get('content-type')
  if (!contentType) return true
  return contentType.includes('application/json') === false
}

const isANoContentRequest = request => request.status === 204

const parseResponseByType = jsonApi => response => {
  const promise = getDataPromiseByData(response, jsonApi)
  return promise.then(data => ({
    data,
    meta: response.meta,
    links: response.links,
  }))
}

const parseError = rawResponse => res => successStatus(rawResponse.status) ? res : Promise.reject(res)

const filterResponse =
  ({ only }, status) =>
  response =>
    only && successStatus(status) ? response[only] : response

const successStatus = status => status >= 200 && status < 300

const getDataPromiseByData = (response, jsonApi) => {
  if (mustReturnOriginalResponse(jsonApi, response)) {
    return Promise.resolve(response)
  }
  const simpleResponse = extractSimpleResponseOfType(['results', 'errors'])(response)
  const keys = Object.keys(response)
  if (keys.includes('results') || keys.includes('errors')) {
    return Promise.resolve(simpleResponse)
  }
  return deserialize(response)
}

const extractSimpleResponseOfType = types => response => {
  const type = types.find(type => response[type] !== undefined)
  return type ? response[type] : undefined
}

const mustReturnOriginalResponse = (jsonApi, response) => jsonApi === false || Array.isArray(response)
