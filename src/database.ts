import pgp, { ITask, IDatabase } from 'pg-promise'
import * as monitor from 'pg-monitor'
import options from '@/config'

export type DbContext = ITask<object> | IDatabase<object>

const dbConnection = {
  ...options.database,
  max: 30,
}

const pgpSetup = (connectionOptions: object) => {
  const dbOpts = {}
  monitor.attach(dbOpts)
  monitor.setTheme('matrix')
  return pgp(dbOpts)(connectionOptions)
}

export const db = pgpSetup(dbConnection)
