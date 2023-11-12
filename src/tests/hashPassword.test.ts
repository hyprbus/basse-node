import { hashPassword } from '../utils/password'

describe('hashPassword', () => {
  it('should return a hashed password', async () => {
    const hashedPassword = await hashPassword('password')
    expect(hashedPassword).not.toBe('password')
  })
})
