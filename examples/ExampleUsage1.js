import Example1 from './ExampleModelA'

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
