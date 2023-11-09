import Fastify from 'fastify'
import { routes } from './routes'
import postgres from '@fastify/postgres'
const fastify = Fastify({ logger: true })

fastify.register(postgres, {
  connectionString: 'postgresql://postgres:postgres@localhost:5434/postgres',
})

fastify.register(routes)

fastify.addHook('preHandler', (_, reply, done) => {
  reply.header('Content-Type', 'application/json')
  done()
})

const start = async () => {
  try {
    await fastify.listen({ port: 5000 })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start()
