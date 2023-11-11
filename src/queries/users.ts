import { db } from '../database'

type User = {
  login: string
  password: string
}

export const findUserByLogin = async (login: string): Promise<User | null> => {
  const user = await db.oneOrNone<User>(
    'SELECT * FROM basse_user WHERE login = $(login)',
    { login },
  )
  return user
}
