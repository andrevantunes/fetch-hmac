import { addDate, addClient, addDevice } from './HeaderHelpers/DeviceHeaders'
import {
  addContentMd5,
  getCanonicalString,
  addAuthorization,
  addCredentials,
} from './HeaderHelpers/AuthorizationHeaders'
import { addUtmParams } from './HeaderHelpers/UtmHeaders'
import { Options } from 'types/MeSalvaApi'
import { clearObject } from './Helpers'

export default function MsHeaders(pathname: string, options: Options): Promise<any> {
  const headers = options.headers || {}
  const { headersWithDate, date } = addDate(headers)
  const headersWithClient = addClient(headersWithDate, options.envs)
  const headersWithDevice = addDevice(headersWithClient, options.envs)
  const { headersWithMd5, contentMd5 } = addContentMd5(headersWithDevice, options.method, options.data)(options.envs)
  const canonicalString = getCanonicalString(options.method, pathname, contentMd5, date)(options.envs)
  const headersWithAuthorization = addAuthorization(headersWithMd5, canonicalString)(options.envs)
  return addCredentials(headersWithAuthorization, options.authenticator)
    .then(headers => addUtmParams(headers))
    .then(clearObject)
    .then(headers => new Headers(headers))
}
