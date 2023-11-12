import { dbQueries } from '.'
import { db } from '../database'

type Task = {
  id: number
  title: string
  description: string
}

type TaskFull = Task & {
  completed: boolean
  created_at: Date
}

export const getTasks = async () => {
  try {
    const tasks = await db.query<Task[]>(dbQueries.getTasks, {
      columns: ['id', 'title', 'description'],
      table: 'tasks',
      id: 0,
    })
    return tasks
  } catch (error) {
    return { error: error }
  }
}

export const getTasksFull = async () => {
  return db.query<TaskFull[]>('SELECT * FROM tasks')
}
