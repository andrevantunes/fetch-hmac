import { getAllCookies } from '../src/Cookies'

test('getDocumentCookie', () => {
  expect(getAllCookies()).toEqual({})
})
