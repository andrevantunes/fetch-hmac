import cookies from 'js-cookie'
import { addUtmParams } from '../../src/HeaderHelpers/UtmHeaders'

describe('addUtmParams', () => {
  describe('when utm cookies empty', () => {
    it('should add nothing to headers', () => {
      const utmParams = addUtmParams({})
      expect(utmParams).toEqual({})
    })

    it('should dont add another cookies to headers', () => {
      cookies.set('uid', 'UID')
      const utmParams = addUtmParams({})
      expect(utmParams).toEqual({})
    })
  })

  describe('have cookie utm_content', () => {
    it('add utm_content to header', () => {
      cookies.set('utm_content', 'utm_content_value')
      const utmParams = addUtmParams({})
      expect(utmParams).toEqual({ utm_content: 'utm_content_value' })
    })
  })
})
