import IUser, { User, UserWithoutPassword } from "@/repository/IUser";
import { hasher } from "@/utils/hasher";
import { getFieldsWithValues } from "@/utils/transformers/getFieldsWithValues";
import db from "../..";

export default class UsersPgPromise implements IUser {
  async clear(): Promise<void> {
    await db.none('delete from users;')
  }

  async createUser(user: User): Promise<void> {
    const hashPassword = await hasher(10, user.password)
    db.none(
      'insert into users (name, email, password) values ($1, $2, $3)',
      [user.name, user.email, hashPassword]
    )
  }

  async listUsers(): Promise<UserWithoutPassword[] | []> {
    const users = await db.manyOrNone<User>('select id, name, email from users;')

    return [...users]
  }

  async getUserByID(id: number): Promise<User | undefined> {
    const user = await db.oneOrNone<User>('select * from users where id=$1', id)

    return user ?? undefined
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const user = await db.oneOrNone<User>('select * from users where email=$1', email)

    return user ?? undefined
  }

  async findUsersByName(partialName: string): Promise<UserWithoutPassword[] | []> {
    const users = await db.manyOrNone<User>(
      "select id, name, email from users where name like '%$1:value%';",
      partialName
    )

    return [...users]
  }

  async updateUser(id: number, user: Partial<User>): Promise<void> {
    const values = getFieldsWithValues(user).toString()

    await db.none('update users set $1:raw where id=$2;', [values, id])
  }

  async deleteUser(id: number): Promise<void> {
    await db.none('delete from users where id=$1', id)
  }
}