import { join } from 'path'
import pgp from 'pg-promise'

const createQueryFile = (file: string) => {
  const fullPath = join(__dirname, file)
  return new pgp.QueryFile(fullPath, { minify: true })
}

const sqlGetTasks = createQueryFile('./getTasks.sql')

export const dbQueries = {
  getTasks: sqlGetTasks,
}
