import { z } from "zod"

const Email = z.string().email("is not valid format of email")

type Email = z.infer<typeof Email>

export const UserSchema = z.object({
  id: z.number().optional(),
  name: z.string(),
  email: Email,
  password: z.string(),
})

export const PartialUserSchema = UserSchema.partial()

export type User = z.infer<typeof UserSchema>
export type UserWithoutPassword = Omit<User, 'password'>

export default interface IUser {
  createUser(user: User): Promise<void>;
  listUsers(): Promise<UserWithoutPassword[] | []>;
  getUserByID(id: number): Promise<User | undefined>
  getUserByEmail(email: Email): Promise<User | undefined>
  findUsersByName(partialName: string): Promise<UserWithoutPassword[] | []>
  updateUser(id: number, user: Partial<User>): Promise<void>;
  deleteUser(id: number): Promise<void>;
  clear(): Promise<void>;
}
