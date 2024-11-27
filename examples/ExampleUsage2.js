const Example2 = require('./ExampleModelA')

Example2.get().then(data => console.log(data))
// will make a GET request to: https://api_host/some_api_route

// is the same that:
Example2.request({ method: 'GET', only: 'data' }).then(data => console.log(data))
// or the same that:
Example2.request({ method: 'GET' }).then(response => console.log(response.data))

Example2.post({ data: { someField: 'someValue' } }).then(data => console.log(data))
// is the same that:
Example2.request({
  method: 'POST',
  only: 'data',
  data: { someField: 'someValue' },
}).then(data => console.log(data))
// will make a POST request to: https://api_host/some_api_route, sending as payload  {"someField": "someValue'}
