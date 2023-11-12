// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FastifyInstance } from 'fastify'

declare module 'fastify' {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface FastifyInstance {
    authenticate: (
      request: FastifyRequest,
      reply: FastifyReply,
    ) => Promise<void>
  }
}
