import { Deserializer } from 'jsonapi-serializer'

export const deserialize = (data: any): Promise<any> => {
  return new Promise((resolve, reject) =>
    new Deserializer({}).deserialize(data, (err: any, response: any) => (err ? reject(err) : resolve(response)))
  )
}
