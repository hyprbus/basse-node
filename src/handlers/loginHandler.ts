import { findUserByUsername } from '@/sql/users'
import { UserType } from '@/schemas'
import { verifyPassword } from '@/utils/password'
import { FastifyReply, FastifyRequest } from 'fastify'
import { db } from '@/database'

export const loginHandler = async (
  req: FastifyRequest<{ Body: UserType }>,
  res: FastifyReply,
) => {
  const { username, password } = req.body

  const storedUser = await findUserByUsername(db)(username)

  if (!storedUser) {
    res.status(404).send({ message: 'User not found' })
    return
  }

  const loginOK = await verifyPassword(password, storedUser.password)

  if (!loginOK) {
    res.status(401).send({ message: 'Incorrect password' })
    return
  }

  // generate token
  const accessToken = req.server.jwt.sign({ username })

  res.send({ accessToken })
}
