export type Options = {
  jsonApi?: boolean
  method?: Method
  envs?: Partial<Envs>
  data?: any
  headers?: any
  authenticator?: any
  route?: string
  only?: 'data' | 'headers' | 'status' | 'meta' | 'links'
  disableCamelCase?: boolean
}

export type RequestOptions = Partial<Options> | string | number

export type BasePath = string

export type Envs = {
  HMAC_KEY: string
  REMOVE_PARAMS?: string
  CLIENT?: string
  API_HOST: string
  BROWSER: boolean
  [env: string]: any
}

type MethodUppercase = 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE'
export type Method = string | MethodUppercase

export type Request = <T = any>(options?: RequestOptions) => Promise<T>

declare interface Credentials {
  accessToken?: string
  uid?: string
}

export interface Authenticator {
  get?: () => any
  set?: (credentials: Credentials) => any
}

export interface IMeSalvaApi {
  request: <T = any>(options?: Options) => Promise<T>
  get: Request
  patch: Request
  put: Request
  post: Request
  remove: Request
}
