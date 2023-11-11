import { FastifyInstance } from 'fastify'
import { getTasks, getTasksFull } from './queries/tasks'
import { tasksSchema, loginJsonSchema } from './schemas'
import { loginHandler } from './handlers/loginHandler'

export const routes = async (fastify: FastifyInstance) => {
  fastify.get('/', async () => {
    return { hello: 'world' }
  })

  fastify.post('/login', loginJsonSchema, loginHandler)

  fastify.get(
    '/tasks',
    {
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
