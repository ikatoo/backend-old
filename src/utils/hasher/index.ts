import * as bcrypt from 'bcrypt'

const hasher = async (saltRounds: number, password: string) => {
  const salt = await bcrypt.genSalt(saltRounds)
  const hashedPassword = await bcrypt.hash(password, salt)

  return `${hashedPassword}`
}

const compareHash = async (password: string, hash: string) =>
  await bcrypt.compare(password, hash)

export { hasher, compareHash }