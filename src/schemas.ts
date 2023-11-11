import { z } from 'zod'
import { zodToJsonSchema } from 'zod-to-json-schema'

const loginBodySchema = z.object({
  login: z.string(),
  password: z.string(),
})

export type LoginBodyType = z.infer<typeof loginBodySchema>

export const loginJsonSchema = {
  schema: {
    body: zodToJsonSchema(loginBodySchema),
  },
}

export const tasksSchema = {
  type: 'array',
  items: {
    type: 'object',
    properties: {
      id: { type: 'integer' },
      title: { type: 'string' },
      description: { type: 'string' },
    },
  },
}
