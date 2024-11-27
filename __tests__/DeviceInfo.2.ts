import { getUserAgent } from '../src/DeviceInfo'

jest.doMock('../src/Environment', () => ({
  BROWSER: false,
}))

describe('getUserAgent', () => {
  test('getUserAgent', () => expect(getUserAgent({})).toEqual(undefined))
})
