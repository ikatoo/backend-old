vi.mock("@/utils/hasher")
import { User } from "@/repository/IUser";
import { beforeEach, describe, expect, test, vi } from "vitest";
import UsersPgPromise from ".";
import db from "../..";

describe("Basic operations in Users Repository", () => {
  const usersRepository = new UsersPgPromise()
  const mockedUsers = [
    {
      name: 'name test1',
      email: 'test1@mail.com',
      password: 'secretpass1'
    },
    {
      name: 'name test2',
      email: 'test2@mail.com',
      password: 'secretpass2'
    },
  ]
  const values = mockedUsers.map(
    value => `('${value.name}','${value.email}','${value.password}')`
  ).toString()

  beforeEach(() => {
    db.none('delete from users;')
  })

  test("CREATE Method", async () => {
    vi.mock("@/utils/hasher", () => vi.fn().mockResolvedValueOnce('hash'))
    
    const mocked = vi.spyOn(db, 'none')
    const mock = mockedUsers[0]
    await usersRepository.createUser(mock)

    expect(mocked).toHaveBeenCalledTimes(1)
    expect(mocked).toHaveBeenCalledWith(
      'insert into users (name, email, password) values ($1, $2, $3)',
      [mock.name, mock.email, 'hash']
    )

    // const result = await db.any('select name, email from users;')
    // const expected = [{ name: mock.name, email: mock.email }]

    // expect(result).toEqual(expected)
  });

  test("LIST ALL Method", async () => {
    await db.none(
      `insert into users (name, email, password) values ${values}`,
      values
    )

    const results = (await usersRepository.listUsers())
      .map(result => ({
        name: result.name,
        email: result.email
      }))
    const expected = mockedUsers.map(user => ({
      name: user.name,
      email: user.email
    }))

    expect(results).toEqual(expected)
  });

  test("GET BY EMAIL Method", async () => {
    const mock = mockedUsers[1]
    await db.none(
      `insert into users (name, email, password) values ${values}`,
      values
    )

    const result = await usersRepository.getUserByEmail(mock.email)

    expect(result).toEqual({ id: result?.id, ...mock })
  });

  test("FIND BY NAME Method", async () => {
    const mock = mockedUsers[1]
    await db.none(
      `insert into users (name, email, password) values ${values}`,
      values
    )
    const result = await usersRepository.findUsersByName('2')
    const expected = [{
      id: result[0].id,
      name: mock.name,
      email: mock.email
    }]

    expect(result).toEqual(expected)
  });

  test("UPDATE Method", async () => {
    await db.none(
      `insert into users (name, email, password) values ${values}`,
      values
    )
    const existentUsers = await db.many('select * from users')
    const updatedUser = { ...existentUsers[0], name: 'new name', password: 'newpass' }
    await usersRepository.updateUser(updatedUser.id, updatedUser)
  });

  test("DELETE Method", async () => {
    await db.none(
      `insert into users (name, email, password) values ${values}`,
      values
    )

    const userForDelete = await db.one('select * from users where email=$1', mockedUsers[0].email)
    await usersRepository.deleteUser(userForDelete.id)

    const expected = [mockedUsers[1]]
    const result = (await db.many<User>('select * from users')).map(user => {
      const { id, ...rest } = user
      return rest
    })

    expect(result).toEqual(expected)
  })
})
