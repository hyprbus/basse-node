import { findUserByLogin } from '@/queries/users'
import { LoginBodyType } from '@/schemas'
import { verifyPassword } from '@/utils/hashPassword'
import { FastifyReply, FastifyRequest } from 'fastify'

export const loginHandler = async (
  req: FastifyRequest<{ Body: LoginBodyType }>,
  res: FastifyReply,
) => {
  const { login, password } = req.body

  const storedUser = await findUserByLogin(login)

  if (!storedUser) {
    res.status(404).send({ message: 'User not found' })
    return
  }

  const loginOK = await verifyPassword(password, storedUser.password)

  if (!loginOK) {
    res.status(401).send({ message: 'Incorrect password' })
    return
  }

  res.send({ message: 'Login OK' })
}
