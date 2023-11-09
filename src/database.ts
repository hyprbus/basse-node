import pgp from 'pg-promise'
import * as monitor from 'pg-monitor'

const dbConnection = {
  host: 'localhost',
  port: 5434,
  database: 'postgres',
  user: 'postgres',
  password: 'postgres',
  max: 30,
}

const pgpSetup = (connectionOptions: object) => {
  const dbOpts = {}
  monitor.attach(dbOpts)
  console.log(connectionOptions)
  monitor.setTheme('matrix')
  return pgp(dbOpts)(connectionOptions)
}

export const db = pgpSetup(dbConnection)
