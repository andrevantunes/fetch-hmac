import { normalizePathname } from '../src/PathnameNormalizer'

describe('PathnameNormalizer', () => {
  describe('#normalizePathname', () => {
    describe('as GET method', () => {
      describe('as relative path starting without /', () => {
        test('returns path starting with /', () => {
          expect(normalizePathname('path', { method: 'GET' })).toEqual('/path')
        })
      })
      describe('as relative path starting with /', () => {
        test('returns path starting with /', () => {
          expect(normalizePathname('/path', { method: 'GET' })).toEqual('/path')
        })
      })

      describe('receiving a route starting with /', () => {
        test('returns /path + /route', () => {
          expect(normalizePathname('path', { method: 'GET', route: '/jsons' })).toEqual('/path/jsons')
        })
      })
      describe('receiving a route not starting with /', () => {
        test('returns /path + /route', () => {
          expect(normalizePathname('path', { method: 'GET', route: 'jsons' })).toEqual('/path/jsons')
        })
      })

      describe('as full content', () => {
        test('returns /path + /route + query parameters (in this order)', () => {
          expect(
            normalizePathname('/path', {
              method: 'GET',
              route: 'jsons',
              data: { camelcaseKey: 'SomeValue', PascalCaseKey: true, snakecase_key: 10 },
            })
          ).toEqual('/path/jsons?camelcase_key=SomeValue&pascal_case_key=true&snakecase_key=10')
        })
      })
    })

    describe('as POST method', () => {
      describe('as full content', () => {
        test('returns path starting with /', () => {
          expect(
            normalizePathname('/path', {
              method: 'POST',
              route: 'jsons',
              data: { camelcaseKey: 'SomeValue', PascalCaseKey: true, snakecase_key: 10 },
            })
          ).toEqual('/path/jsons')
        })
      })
    })
  })
})
