import { z } from "zod"

const Email = z.string().email("is not valid format of email")

type Email = z.infer<typeof Email>

export const UserSchema = z.object({
  name: z.string(),
  email: Email,
  password: z.string(),
})

export const PartialUserSchema = UserSchema.partial()

export type User = z.infer<typeof UserSchema>

export default interface IUser {
  createUser(user: User): Promise<void>;
  listUsers(): Promise<User[] | []>;
  getUserByEmail(email: Email): Promise<User> | undefined
  findUserByName(partialName: string): Promise<User> | undefined
  updateUser(id: number, user: Partial<User>): Promise<void>;
  deleteUser(id: number): Promise<void>;
  clear(): Promise<void>
}
