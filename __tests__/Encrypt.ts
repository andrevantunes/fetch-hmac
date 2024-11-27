import * as Encrypt from '../src/Encrypt'
import { getEnvVars } from '../src/Environment'

const envs = getEnvVars({ HMAC_KEY: 'XYZ' })

describe('encryptMD5 and getHmacSha1', () => {
  const tests = [
    {
      statement: 'When null or undefined data',
      inputs: [null, '', undefined],
      encryptMD5: ['', '', ''],
      getHmacSha1: ['M6BTkaJpRiiawuOElfcdt4+v4Ws=', 'M6BTkaJpRiiawuOElfcdt4+v4Ws=', 'M6BTkaJpRiiawuOElfcdt4+v4Ws='],
    },
    {
      statement: 'When empty array or object data',
      inputs: [{}, []],
      encryptMD5: ['', ''],
      getHmacSha1: ['2Ves0/SEYM5XwF8qNOoXo4e6F18=', '2Ves0/SEYM5XwF8qNOoXo4e6F18='],
    },
    {
      statement: 'When valid variales',
      inputs: [{ test: 'test' }, [1, 2, 3], 'SomeString', 12345],
      encryptMD5: [
        'govO+HY8G8YW4loGvkuQ/w==',
        '8eRvMo5t7NVsZN1edh3Ctw==',
        'zI+mB4qzUNOTqSBClcFUKA==',
        'gnzLDuqKcGxMNKFokfhOew==',
      ],
      getHmacSha1: [
        '2Ves0/SEYM5XwF8qNOoXo4e6F18=',
        '2Ves0/SEYM5XwF8qNOoXo4e6F18=',
        'iKiWj1qY2SeziU1OEgoaJmI2ues=',
        '2Ves0/SEYM5XwF8qNOoXo4e6F18=',
      ],
    },
  ]
  const methods = ['encryptMD5', 'getHmacSha1']
  tests.forEach(options => {
    methods.forEach(method => {
      it(`${options.statement} - ${method}`, () => {
        options.inputs.forEach((input, i) => {
          expect(Encrypt[method](input, envs || {})).toEqual(options[method][i])
        })
      })
    })
  })
})
//
