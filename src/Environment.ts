import { Envs } from './types/MeSalvaApi'

export const getEnvVars = (env: Partial<Envs> = {}): Envs => ({
  HMAC_KEY: env.HMAC_KEY || process.env.HMAC_KEY || '',
  REMOVE_PARAMS: env.REMOVE_PARAMS || process.env.REMOVE_PARAMS,
  CLIENT: env.CLIENT || process.env.CLIENT,
  API_HOST: env.API_HOST || process.env.API_HOST || '',
  BROWSER: typeof document !== 'undefined',
})
