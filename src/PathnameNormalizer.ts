import { ensureSlashBefore } from './GeneralHelpers'
import { isNotEmptyObject } from './Object'
import { Options } from './types/MeSalvaApi'
import { snakecaseObjectFields } from './CaseParser'

export const normalizePathname = (basePath: string, options: Options): string => {
  let pathname = ensureSlashBefore(basePath || '')
  if (options.route) pathname += ensureSlashBefore(options.route)
  if (isAGetMethodWithParams(options)) {
    const queryParams = new URLSearchParams(snakecaseObjectFields(options.data))
    pathname += `?${queryParams.toString()}`
  }

  return pathname
}

const isAGetMethodWithParams = (options: Options): Boolean => {
  return options.method === 'GET' && isNotEmptyObject(options?.data)
}
