import Fastify from 'fastify'
import { routes } from './routes'

const options = { logger: true }

const fastify = Fastify(options)

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
