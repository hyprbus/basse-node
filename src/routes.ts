import { FastifyInstance } from 'fastify'
import { getTasks, getTasksFull } from './sql/tasks'
import { tasksSchema, loginJsonSchema } from './schemas'
import { loginHandler } from './handlers/loginHandler'

export const routes = async (fastify: FastifyInstance) => {
  fastify.get('/', async () => {
    return Promise.resolve({ hello: 'will ferrell' })
  })

  fastify.post('/login', loginJsonSchema, loginHandler)

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

  fastify.get('/tasksfull', async () => {
    return getTasksFull()
  })
}
