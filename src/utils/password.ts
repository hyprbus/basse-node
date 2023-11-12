import bcrypt from 'bcrypt'

export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 5
  const hash = await bcrypt.hash(password, saltRounds)
  return hash
}

export const verifyPassword = async (
  password: string,
  hash: string,
): Promise<boolean> => {
  const match = await bcrypt.compare(password, hash)
  return match
}
