import {
  getCanonicalString,
  addAuthorization,
  addContentMd5,
  addCredentials,
} from '../../src/HeaderHelpers/AuthorizationHeaders'
import { getEnvVars } from '../../src/Environment'

const envs = getEnvVars({ HMAC_KEY: 'xyz', CLIENT: 'WEB' })

describe('getCanonicalString', () => {
  const method = 'GET'
  const pathname = '/somepath?homeField=someValue'
  const md5Hash = 'SomeMontentMd5Hash'
  const date = '2018-01-01T00:00:01'
  const getCanonicalStringClosure = getCanonicalString(method, pathname, md5Hash, date)

  describe('when use default envs', () => {
    it('should contain right canonical array', () => {
      expect(getCanonicalStringClosure(envs)).toEqual(`${method},application/json,${md5Hash},${pathname},${date}`)
    })
  })

  describe('when use custom envs with REMOVE_PARAMS = true', () => {
    it('should contain right canonical array', () => {
      expect(getCanonicalStringClosure({ ...envs, REMOVE_PARAMS: true })).toEqual(
        `${method},application/json,${md5Hash},/somepath,${date}`
      )
    })
  })
})

describe('addAuthorization', () => {
  const mockCanonicalString =
    'GET,application/json,SomeMontentMd5Hash,/somepath?homeField=someValue,2018-01-01T00:00:01'
  describe('when receive a headers and canonicalString', () => {
    it('should return a valid header with authorization token', () => {
      const mockInitialHeaders = {}
      const headers = addAuthorization({}, mockCanonicalString)(envs)
      expect(headers).toEqual({
        ...mockInitialHeaders,
        Authorization: 'APIAuth WEB:bnoIL86NKfY5Yni+dpcru+3gnb4=',
      })
    })
  })
})

describe('addContentMd5', () => {
  const previousHeader = { SomeHeaderField: 'SomeHeaderValue' }
  describe('when GET method and some data', () => {
    it('should do not modify previous headers and return no contentMD5 and return no contentMD5', () => {
      const headers = addContentMd5(previousHeader, 'GET', { field: 'value' })(envs)
      expect(headers).toEqual({ headersWithMd5: previousHeader })
    })
  })

  describe('when not GET method', () => {
    it('should return right modified headers and right contentMD5', () => {
      const methods = ['POST', 'PUT', 'PATCH', 'DELETE']
      methods.forEach(method => {
        const headers = addContentMd5(previousHeader, method, {
          someField: 'SomeValue',
        })(envs)
        expect(headers).toEqual({
          contentMd5: '8npm9YI3OUnNgKP+YfkVGA==',
          headersWithMd5: {
            ...previousHeader,
            'Content-MD5': headers.contentMd5,
          },
        })
      })
    })
  })

  describe('when not POST method AND have no data', () => {
    it('should do not modify previous headers and return no contentMD5', () => {
      const method = 'POST'
      const headers = addContentMd5(previousHeader, method, null)(envs)
      expect(headers).toEqual({ headersWithMd5: previousHeader })
    })
  })
})

describe('addCredentials', () => {
  const accessToken = 'SomeRandomHash'
  const uid = 'test@mesalva.com'

  test('when user is GUEST', () => {
    const authenticator = { get: () => ({}) }
    return addCredentials({}, authenticator).then(headers => expect(headers).toEqual({}))
  })

  test('when user is AUTH', () => {
    const authenticator = { get: () => ({ accessToken, uid }) }
    return addCredentials({}, authenticator).then(headers =>
      expect(headers).toEqual({ 'Access-Token': accessToken, Uid: uid })
    )
  })

  test('when user is AUTH', () => {
    const authenticator = {
      get: () => ({ ['access-token']: accessToken, uid }),
    }
    return addCredentials({}, authenticator).then(headers =>
      expect(headers).toEqual({ 'Access-Token': accessToken, Uid: uid })
    )
  })
})
