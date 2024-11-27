jest.doMock('../src/Environment', () => ({ BROWSER: false }))
const { getAllCookies } = require('../src/Cookies')

test('getDocumentCookie', () => {
  expect(getAllCookies()).toEqual({})
})
