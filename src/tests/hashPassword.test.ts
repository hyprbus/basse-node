import { hashPassword } from '../utils/hashPassword'

describe('hashPassword', () => {
  it('should return a hashed password', async () => {
    const hashedPassword = await hashPassword('password')
    expect(hashedPassword).not.toBe('password')
  })
})
