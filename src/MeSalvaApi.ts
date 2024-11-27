import 'cross-fetch/polyfill'

import { Authenticator, BasePath, Envs, IMeSalvaApi, Method, Options, RequestOptions } from './types/MeSalvaApi'
import { snakecaseObjectFields } from './CaseParser'
import { getEnvVars } from './Environment'
import { ensureNotSlashAfter } from './GeneralHelpers'
import MsHeaders from './MsHeaders'
import { normalizePathname } from './PathnameNormalizer'
import { parseResponse } from './Serializer'

const parseBody = ({ method, data }: Options) => {
  if (method === 'GET' || !data) return undefined
  const jsonData = JSON.stringify(data)
  return snakecaseObjectFields(jsonData)
}

export default class MeSalvaApi implements IMeSalvaApi {
  private envs: Envs

  constructor(private basePath: BasePath, envs: Partial<Envs>, private authenticator: Authenticator) {
    this.envs = getEnvVars(envs)
  }

  request<T = any>(options?: Options): Promise<T> {
    const opts = this.parseOptions(options)
    const pathname = normalizePathname(this.basePath, opts)
    const fullUrl = ensureNotSlashAfter(opts.envs.API_HOST) + pathname
    return MsHeaders(pathname, opts)
      .then(headers => ({ body: parseBody(opts), headers, mode: 'cors', cache: 'default', method: opts.method }))
      .then((requestConfig: any) => fetch(fullUrl, requestConfig))
      .then(parseResponse(options))
  }

  get(options?: RequestOptions): Promise<any> {
    return this.simpleRequest('get', options)
  }
  put(options?: RequestOptions): Promise<any> {
    return this.simpleRequest('put', options)
  }
  patch(options?: RequestOptions): Promise<any> {
    return this.simpleRequest('patch', options)
  }
  post(options?: RequestOptions): Promise<any> {
    return this.simpleRequest('post', options)
  }
  remove(options?: RequestOptions): Promise<any> {
    return this.simpleRequest('delete', options)
  }

  private simpleRequest(method: Method, options?: RequestOptions): Promise<any> {
    if (typeof options === 'string' || typeof options === 'number') {
      return this.request({ method, route: String(options), only: 'data' })
    }
    return this.request({ ...options, method, only: 'data' })
  }

  private parseOptions(options?: Options) {
    const defaultOptions = { jsonApi: true, method: 'GET' }
    const newOptions = { ...defaultOptions, ...options }
    return {
      ...newOptions,
      method: newOptions.method.toUpperCase(),
      envs: { ...this.envs, ...newOptions.envs },
      authenticator: newOptions.authenticator || this.authenticator,
    }
  }
}
