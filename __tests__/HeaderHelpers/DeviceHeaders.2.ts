jest.doMock('../../src/DeviceInfo', () => ({
  hasInfo: () => false,
  getUserAgent: () => ({}),
}))
const { addDevice } = require('../../src/HeaderHelpers/DeviceHeaders')

test('addDevice', () => {
  expect(addDevice({})).toEqual({})
})
