import { GraphQLClient } from 'graphql-request'

const api = new GraphQLClient(process.env.NEXT_PUBLIC_API_URL as string)

export { api }
