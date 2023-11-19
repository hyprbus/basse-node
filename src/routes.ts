import { getTasks, getTasksFull } from './sql/tasks'
import { tasksSchema, loginJsonSchema } from './schemas'
import { loginHandler } from './handlers/loginHandler'
import { Type, FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox'

const TestSchema = {
  params: Type.Object({
    address: Type.String(),
  }),
  querystring: Type.Object({
    chain: Type.String(),
  }),
  response: {
    200: Type.Object({
      foo: Type.String(),
    }),
  },
}

export const routes: FastifyPluginAsyncTypebox = async fastify => {
  fastify.get('/', async () => {
    return Promise.resolve({ hello: 'will ferrell' })
  })

  fastify.post('/login', loginJsonSchema, loginHandler)

  fastify.get(
    '/test/:address',
    {
      schema: TestSchema,
    },
    async request => {
      console.log('request', request.params.address, request.query)
      return Promise.resolve({ foo: request.query.chain })
    },
  )

  fastify.get(
    '/tasks',
    {
      onRequest: [fastify.authenticate],
      schema: {
        response: {
          200: tasksSchema,
        },
      },
    },
    async () => {
      return getTasks()
    },
  )

  fastify.get('/tasksfull', async (request, reply) => {
    const basicAuth = request.headers.authorization?.split(' ')[1]
    const user = basicAuth
    console.log('basicAuth', basicAuth)

    if (!user) {
      reply.code(401).send()
    }
    if (user) {
      const decodedUser = Buffer.from(user, 'base64').toString().split(':')
      console.log('decoded', decodedUser)
    }
    return getTasksFull()
  })
}
