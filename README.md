# npm package "@mesalva/api"

[![npm version](https://badge.fury.io/js/%40mesalva%2Fapi.svg)](https://badge.fury.io/js/%40mesalva%2Fapi)
[![Build Status](https://semaphoreci.com/api/v1/mesalva/js-api-request/branches/master/shields_badge.svg)](https://semaphoreci.com/mesalva/js-api-request)
[![Maintainability](https://api.codeclimate.com/v1/badges/e0f21a4009a4f14e633d/maintainability)](https://codeclimate.com/repos/59ee40ab36611f02950005c3/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/e0f21a4009a4f14e633d/test_coverage)](https://codeclimate.com/repos/59ee40ab36611f02950005c3/test_coverage)

## Introduction

This package is used by [Me Salva Engineering Team](https://mesalva.com) to make requests to Api,
using [HMAC authentication protocol](https://pt.wikipedia.org/wiki/HMAC) + [universal fetch](https://www.npmjs.com/package/universal-fetch) to make requests by
server side (we use [express](https://www.npmjs.com/package/express)) + 
[Json Api Serializer](https://www.npmjs.com/package/json-api-serializer) to parse the api [JSON API BASED](http://jsonapi.org)
to simple Javascript [Camel Case](https://en.wikipedia.org/wiki/Camel_case) Based objects

## Installation

### yarn way

```bash
yarn add @mesalva/api
```

### npm way

```bash
npm install --save @mesalva/api
```

## Configurations

### .env file

On project root folder add a file called `.env.js` with the structure below:
 
```js
module.exports = {
  API_HOST: 'https://API_HOST',
  CLIENT: 'WEB|ANDROID|IOS|...',
  HMAC_KEY: 'HMAC_KEY',
}
```

## Usage

Creating a model

[./examples/ExampleModelA.js](https://github.com/mesalva/js-api-request/blob/doc/readme/examples/ExampleModelA.js)
```js
import MSApiRequest from '@mesalva/api'

const ExampleA = new MSApiRequest('some_api_route')

export default ExampleA
```

This model allow you to use the methods below:

[./examples/ExampleUsage1.js](https://github.com/mesalva/js-api-request/blob/doc/readme/examples/ExampleUsage1.js)
```js
import Example1 from './examples/ExampleModelA'

Example1.request({
  method: 'GET|POST|PUT|DELETE|PATCH', //default = GET
  route: 'additional route', //default = GET
  data: {...OBJECT_WITH_REQUEST_PARAMS}, //default = undefined
  headers: {...OBJECT_WITH_ADDICTIONAL_HEADERS}, // default = undefined
  only: 'data|headers|status|meta', // default = undefined
}).then(response => {
  console.log(response.data)
  console.log(response.meta)
  console.log(response.headers)
  console.log(response.status)
})
```

### Custom ENVS

You can pass some custom env vars on MsApiRequest initialization. This will allow to use two or more api accesses in the same project.

```js
import MSApiRequest from '@mesalva/api'

const ExampleA = new MSApiRequest('some_api_route', {
  API_HOST: 'https://some.another.host',
  HMAC_KEY: 'SomeAnotherHmacKey'
})

export default ExampleA
```

### Some alias

[./examples/ExampleUsage2.js](https://github.com/mesalva/js-api-request/blob/doc/readme/examples/ExampleUsage2.js)
```js
import Example2 from './examples/ExampleModelA'

Example2.get().then(data => console.log(data))
// will make a GET request to: https://api_host/some_api_route

// is the same that:
Example2.request({ method: 'GET', only: 'data' }).then(data => console.log(data))
// or the same that:
Example2.request({ method: 'GET' }).then(response => console.log(response.data))


Example2.post({ data: {someField: 'someValue'}}).then(data => console.log(data))
// is the same that:
Example2.request({
  method: 'POST',
  only: 'data',
  data: {someField: 'someValue'},
}).then(data => console.log(data))
// will make a POST request to: https://api_host/some_api_route, sending as payload  {"someField": "someValue'}
```

These are the valid alias: [ post, put, delete, get, patch ]


### Explaining request params
- method - Set request [HTTP method](https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Methods), 
the allow methods are: GET, POST, PUT, PATCH, DELETE.

- data - For GET method, means that will add as a url [query string params](https://en.wikipedia.org/wiki/Query_string),
to other methods send as payload in JSON hyphen-saparated format

- headers - add headers to request. This lib will automatic add the headers below, so, this headers can't be overflowed.
  - X-DATE - Some enviroments don't allow to send DATE header, so we send this header by security
  - CLIENT - the same client provided on .env.js file
  - CONTENT-TYPE - application/json
  - PLATFORM - Send to api which platform is requesting
  - DEVICE - Send to api which device is requesting
  - USER-AGENT - Send to api the user-agent of the device that is requesting
  - CONTENT-MD5 - Encrypted data, using HMAC KEY
  - AUTHORIZATION - [HMAC authentication protocol](https://pt.wikipedia.org/wiki/HMAC) implementation created using the canonical string composed by: method + content type + Content-MD5 + pathname + date 
  
  - UID - user authenticated uid (if is not guest user)
  - ACCESS-TOKEN - user authenticated access-token (if is not guest user)
  
## Code Quality
The project have 100% test coverage and no lint issues! All master interactions must have the same code quality
![Coverage](bin/coverage.png?raw=true "Coverage And Lint Print")



