import IUser, { User } from "@/repository/IUser";
import { getFieldsWithValues } from "@/utils/transformers/getFieldsWithValues";
import db from "../..";

export default class UsersPgPromise implements IUser {
  async clear(): Promise<void> {
    await db.none('delete from users;')
  }

  async createUser(user: User): Promise<void> {
    await db.none(
      'insert into users (name, email, password) values ($1, $2, $3)',
      [user.name, user.email, user.password]
    )
  }

  async listUsers(): Promise<User[] | []> {
    const users = await db.many<User>('select * from users;')

    return users
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const user = await db.oneOrNone<User>('select * from users where email=$1', email)

    return user ?? undefined
  }

  async findUsersByName(partialName: string): Promise<User[] | []> {
    const users = await db.many<User>(
      "select * from users where name like '%$1:value%';",
      partialName
    )

    return users
  }

  async updateUser(id: number, user: Partial<User>): Promise<void> {
    const values = getFieldsWithValues(user).toString()

    await db.none('update users set $1:raw where id=$2;', [values, id])
  }

  async deleteUser(id: number): Promise<void> {
    await db.none('delete from users where id=$1', id)
  }
}