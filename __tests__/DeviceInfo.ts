import { getUserAgent } from '../src/DeviceInfo'
import { mockUserAgent, setFakeRequestUserAgent } from './__support__/Device'

describe('As server request with middleware', () => {
  beforeEach(() => setFakeRequestUserAgent())
  test('getUserAgent', () => expect(getUserAgent()?.source).toEqual(mockUserAgent))
})
