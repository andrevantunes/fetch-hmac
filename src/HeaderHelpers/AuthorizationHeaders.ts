import { Authenticator } from 'types/MeSalvaApi'
import 'cross-fetch/polyfill'
import { encryptMD5, getHmacSha1 } from '../Encrypt'

export function getCanonicalString(method, pathname, content_md5, date) {
  return envs => {
    const parsedPathname = envs.REMOVE_PARAMS ? pathname.split('?').shift() : pathname
    return [method, 'application/json', content_md5, parsedPathname, date].join()
  }
}

export function addAuthorization(headers, canonical_string) {
  return envs => ({
    ...headers,
    Authorization: `APIAuth ${envs.CLIENT}:${getHmacSha1(canonical_string, envs)}`,
  })
}

export function addContentMd5(headers, method, data) {
  return envs => {
    if (method === 'GET') {
      return {
        headersWithMd5: headers,
      }
    }
    const contentMd5 = encryptMD5(data, envs)
    if (!contentMd5) {
      return {
        headersWithMd5: headers,
      }
    }
    return {
      headersWithMd5: { ...headers, 'Content-MD5': contentMd5 },
      contentMd5,
    }
  }
}

const defaultAuthenticator: Authenticator = { get: () => ({ uid: null, accessToken: null }) }

export function addCredentials(headers, authenticator = defaultAuthenticator) {
  return Promise.resolve(typeof authenticator.get === 'function' ? authenticator.get() : authenticator).then(
    (credentials: any) => ({
      ...headers,
      Uid: credentials.uid,
      'Access-Token': credentials.accessToken || credentials['access-token'],
    })
  )
}
