import { FastifyInstance } from 'fastify'
type Task = {
  id: number
  title: string
  description: string
}

type TaskFull = Task & {
  completed: boolean
  created_at: Date
}

const tasksSchema = {
  schema: {
    response: {
      200: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            title: { type: 'string' },
            description: { type: 'string' },
          },
        },
      },
    },
  },
}

export const routes = async (fastify: FastifyInstance) => {
  fastify.get('/', async () => {
    return { hello: 'world' }
  })

  fastify.get('/tasks', tasksSchema, async (_, reply) => {
    const client = await fastify.pg.connect()
    try {
      const { rows } = await client.query(
        'SELECT id, title, description FROM tasks',
      )
      reply.send(rows)
      reply.header('Content-Type', 'application/json')
    } finally {
      // Release the client immediately after query resolves, or upon error
      client.release()
    }
  })

  fastify.get('/tasksfull', async () => {
    return fastify.pg.query<TaskFull[]>('SELECT * FROM tasks')
  })
}
