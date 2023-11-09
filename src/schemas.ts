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
