import { Type, Static } from '@sinclair/typebox'

const loginBodySchema = Type.Object({
  username: Type.String(),
  password: Type.String(),
})

export type UserType = Static<typeof loginBodySchema>

export const loginJsonSchema = {
  schema: {
    body: loginBodySchema,
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
