import * as helpers from '../src/GeneralHelpers'

describe('ensure string slashs', () => {
  const expects = {
    something: ['/something', 'something'],
    '/something': ['/something', '/something'],
    'something/': ['/something/', 'something'],
    '/something/': ['/something/', '/something'],
  }
  const methods = ['ensureSlashBefore', 'ensureNotSlashAfter']

  methods.forEach((method, i) => {
    test(method, () => {
      Object.entries(expects).forEach(entry => {
        expect(helpers[method](entry[0])).toEqual(entry[1][i])
      })
    })
  })
})
