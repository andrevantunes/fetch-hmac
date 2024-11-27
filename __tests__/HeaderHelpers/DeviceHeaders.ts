import { addDate, addClient, addDevice } from '../../src/HeaderHelpers/DeviceHeaders'

test('addDate', () => {
  const { headersWithDate, date } = addDate({})
  const expectedDate = new Date().toUTCString()
  expect(date).toEqual(expectedDate)
  expect(headersWithDate).toEqual({ 'X-DATE': expectedDate })
})

test('addClient', () => {
  const envs = { CLIENT: 'web' }
  const headers = addClient({}, envs)
  expect(headers).toEqual({ CLIENT: 'web', 'Content-Type': 'application/json' })
})

test('addDevice', () => {
  expect(addDevice()).toEqual({})
})
