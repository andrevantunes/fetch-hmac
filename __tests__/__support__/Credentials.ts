import cookies from 'js-cookie'

const CREDENTIALS_COOKIE_NAME = 'user-credentials'

const mockCredentials = {
  uid: 'test@mesalva.com',
  'access-token': 'SomeRandomHash',
}

function setFakeCredentials() {
  cookies.set(CREDENTIALS_COOKIE_NAME, mockCredentials)
}

export default {
  setFakeCredentials,
  mockCredentials,
}
