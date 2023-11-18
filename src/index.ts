import Fastify, { FastifyReply, FastifyRequest } from 'fastify'
import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox'
import { routesPlugin } from './routes'
import config from '@/config'
import jwt from '@fastify/jwt'

const options = { logger: true }

const fastify = Fastify(options).withTypeProvider<TypeBoxTypeProvider>()

fastify.register(jwt, {
  secret: config.tokenSecret,
})

fastify.decorate(
  'authenticate',
  async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      await request.jwtVerify()
    } catch (err) {
      reply.send(err)
    }
  },
)

fastify.register(routesPlugin)

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
