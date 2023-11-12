import { DbContext } from '@/database'

type User = {
  login: string
  password: string
}

export const findUserByUsername =
  (dbContext: DbContext) => async (username: string) => {
    const user = await dbContext.oneOrNone<User | null>(
      'SELECT * FROM basse_user WHERE username = $(username)',
      { username },
    )
    return user
  }

/*
* example of using task
  await db.task(async task => {
    await queryWithDb(task)(login)
    await queryWithDb(task)(login)
  })
*/
