import {
  camelcase,
  camelcaseObjectFields,
  snakecase,
  snakecaseObjectFields,
  snakecaseToCamelcaseObjectFields,
} from '../src/CaseParser'

describe('CaseParser', () => {
  describe('#snakecaseToCamelcaseObjectFields', () => {
    describe('receiving not an onbject', () => {
      expect(snakecaseToCamelcaseObjectFields(null)).toEqual(null)
      expect(snakecaseToCamelcaseObjectFields(10)).toEqual(10)
      expect(snakecaseToCamelcaseObjectFields('some_string')).toEqual('some_string')
    })
    describe('receiving an snake_case object keys', () => {
      test('returns a camelcase object keys', () => {
        expect(snakecaseToCamelcaseObjectFields({ some_key: 'some_value' })).toEqual({ someKey: 'some_value' })
      })
    })
    describe('receiving an array of snake_case object keys', () => {
      test('returns an array of camelcase object keys', () => {
        expect(snakecaseToCamelcaseObjectFields([{ some_key: 'some_value' }])).toEqual([{ someKey: 'some_value' }])
      })
    })
    describe('receiving a special case of className', () => {
      test('returns an array of camelcase object keys', () => {
        expect(
          snakecaseToCamelcaseObjectFields({
            some_key: 'some_value',
            className: {
              __WebKit: 10,
              some_key: 20,
            },
          })
        ).toEqual({
          someKey: 'some_value',
          className: {
            __WebKit: 10,
            some_key: 20,
          },
        })
      })
    })
  })

  test('camelcase', () => {
    expect(camelcase('something')).toEqual('something')
    expect(camelcase('something-else')).toEqual('somethingElse')
    expect(camelcase('something_else')).toEqual('somethingElse')
    expect(camelcase('somethingElse')).toEqual('somethingElse')
    expect(camelcase('something else')).toEqual('somethingElse')
    expect(camelcase('Something-Else')).toEqual('somethingElse')
    expect(camelcase('Something_Else')).toEqual('somethingElse')
    expect(camelcase('Something else')).toEqual('somethingElse')
    expect(camelcase('SomethingElse')).toEqual('somethingElse')
  })

  test('camelcaseObjectFields', () => {
    const obj = {
      some$thing: 'with $ inside',
      something: 1,
      'something-else': 'some-value-not-parsed',
      something_else2: 'some_value_not_parsed',
      somethingElse3: 'some value not parsed',
      'something else 4': 'some-value-not-parsed',
      'Something-Else-5': 'some-value-not-parsed',
      Something_Else6: 'some-value-not-parsed',
      withObjectChildren: {
        something: 1,
        'something-else': 'some-value-not-parsed',
        something_else2: 'some_value_not_parsed',
        somethingElse3: 'some value not parsed',
        'something else 4': 'some-value-not-parsed',
        'Something-Else-5': 'some-value-not-parsed',
        Something_Else6: 'some-value-not-parsed',
      },
      withArrayChildren: ['some-string', { 'Some Field': 'someValue' }],
    }
    const expected = {
      some$thing: 'with $ inside',
      something: 1,
      somethingElse: 'some-value-not-parsed',
      somethingElse2: 'some_value_not_parsed',
      somethingElse3: 'some value not parsed',
      somethingElse4: 'some-value-not-parsed',
      somethingElse5: 'some-value-not-parsed',
      somethingElse6: 'some-value-not-parsed',
      withObjectChildren: {
        something: 1,
        somethingElse: 'some-value-not-parsed',
        somethingElse2: 'some_value_not_parsed',
        somethingElse3: 'some value not parsed',
        somethingElse4: 'some-value-not-parsed',
        somethingElse5: 'some-value-not-parsed',
        somethingElse6: 'some-value-not-parsed',
      },
      withArrayChildren: ['some-string', { someField: 'someValue' }],
    }
    expect(camelcaseObjectFields(obj)).toEqual(expected)
  })

  describe('snakecase', () => {
    it('should convert camelcase to snakecase', () => {
      expect(snakecase('someValue')).toBe('some_value')
      expect(snakecase('someValueParsed')).toBe('some_value_parsed')
    })

    it('should convert pascalcase to snakecase', () => {
      expect(snakecase('SomeValue')).toBe('some_value')
      expect(snakecase('SomeValueParsed')).toBe('some_value_parsed')
    })

    it('should NOT convert snakecase', () => {
      expect(snakecase('some_value')).toBe('some_value')
      expect(snakecase('some_value_parsed')).toBe('some_value_parsed')
    })

    it('should convert string with spaces to snakecase', () => {
      expect(snakecase('some value')).toBe('some_value')
      expect(snakecase('some value parsed')).toBe('some_value_parsed')
      expect(snakecase(' some  value parsed ')).toBe('some_value_parsed')
      expect(snakecase(' some   value parsed ')).toBe('some_value_parsed')
    })

    it('should convert kebabcase to snakecase', () => {
      expect(snakecase('some-value')).toBe('some_value')
      expect(snakecase('some-value-parsed')).toBe('some_value_parsed')
      expect(snakecase('Some-Value')).toBe('some_value')
      expect(snakecase('Some-Value-Parsed')).toBe('some_value_parsed')
    })
  })

  describe('snakecaseObjectFields', () => {
    it('should convert only the property camelcase to snakecase', () => {
      expect(snakecaseObjectFields({ someValue: 'some value' })).toEqual({ some_value: 'some value' })
      expect(snakecaseObjectFields({ someValueParsed: 'Some-Value-Parsed' })).toEqual({
        some_value_parsed: 'Some-Value-Parsed',
      })
    })

    it('should convert only the property pascalcase to snakecase', () => {
      expect(snakecaseObjectFields({ SomeValue: 'Some_Value' })).toEqual({ some_value: 'Some_Value' })
      expect(snakecaseObjectFields({ SomeValueParsed: 'some-value-parsed' })).toEqual({
        some_value_parsed: 'some-value-parsed',
      })
    })

    it('should not convert the property snakecase', () => {
      expect(snakecaseObjectFields({ some_value: 'some value' })).toEqual({ some_value: 'some value' })
      expect(snakecaseObjectFields({ some_value_parsed: 'some value parsed' })).toEqual({
        some_value_parsed: 'some value parsed',
      })
    })

    it('should convert only the property kebabcase to snakecase', () => {
      expect(snakecaseObjectFields({ 'some-value': 'some value' })).toEqual({ some_value: 'some value' })
      expect(snakecaseObjectFields({ 'some-value-parsed': 'some value parsed' })).toEqual({
        some_value_parsed: 'some value parsed',
      })
      expect(snakecaseObjectFields({ 'Some-Value': 'Some value' })).toEqual({ some_value: 'Some value' })
      expect(snakecaseObjectFields({ 'Some-Value-Parsed': 'Some value parsed' })).toEqual({
        some_value_parsed: 'Some value parsed',
      })
    })

    it('should convert recursively the object properties', () => {
      const obj = {
        currentPrice: 5000,
        prices: {
          creditCard: 5000,
          bankSlip: 4800,
          pix: 4800,
          playStore: 5000,
        },
        paymentOptions: [
          {
            methodType: 'credit-card',
            iconName: 'credit-card',
            options: {
              isSubscription: false,
            },
          },
          {
            methodType: 'bank-slip',
            iconName: 'bank-slip',
            options: {
              isSubscription: false,
            },
          },
        ],
        nodeModulesId: ['123', '456', '789'],
      }

      const expected = {
        current_price: 5000,
        prices: {
          credit_card: 5000,
          bank_slip: 4800,
          pix: 4800,
          play_store: 5000,
        },
        payment_options: [
          {
            method_type: 'credit-card',
            icon_name: 'credit-card',
            options: {
              is_subscription: false,
            },
          },
          {
            method_type: 'bank-slip',
            icon_name: 'bank-slip',
            options: {
              is_subscription: false,
            },
          },
        ],
        node_modules_id: ['123', '456', '789'],
      }

      expect(snakecaseObjectFields(obj)).toEqual(expected)
    })
  })
})
