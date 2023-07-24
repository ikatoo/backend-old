import { UsersRepository } from "@/infra/db/PgPromise/Users";
import { User } from "@/repository/IUser";
import { beforeEach, describe, expect, test } from "vitest";
import { createUser, deleteUser, findUsersByName, getUserByEmail, listUsers, updateUser } from "./usersController";

describe("User Controller test", () => {
  const userRepository = new UsersRepository()
  const usersMock: User[] = [
    {
      name: 'test name1',
      email: 'teste1@email.com',
      password: 'senhasecreta1'
    },
    {
      name: 'test name2',
      email: 'teste2@email.com',
      password: 'senhasecreta2'
    },
  ]

  beforeEach(async () => {
    await userRepository.clear()
  })

  test("List all users", async () => {
    usersMock.forEach(user => {
      userRepository.createUser(user)
    })
    while ((await userRepository.listUsers()).length < usersMock.length) { }

    const response = await listUsers()
    const { body, statusCode } = response as HandlerResponse
    await userRepository.clear()
    const expected = (body as User[]).map(user => {
      const { id, ...rest } = user
      return rest
    })

    expect(statusCode).toEqual(200)
    expect(expected).toEqual(usersMock)
  });

  test("Get user by email", async () => {
    usersMock.forEach(async user => {
      await userRepository.createUser(user)
    })
    while ((await userRepository.listUsers()).length < usersMock.length) { }

    const response = await getUserByEmail({ parameters: { email: usersMock[0].email } })
    const body = response?.body as User

    expect(response?.statusCode).toEqual(200)
    expect(body).toEqual({ id: body.id, ...usersMock[0] })
  });

  test("Find user by partial name", async () => {
    usersMock.forEach(async user => {
      await userRepository.createUser(user)
    })
    while ((await userRepository.listUsers()).length < usersMock.length) { }

    const response = await findUsersByName({ parameters: { partialName: 'name1' } })
    const { body, statusCode } = response as HandlerResponse
    const expected = (body as User[]).map(user => {
      const { id, ...rest } = user
      return rest
    })

    expect(statusCode).toEqual(200)
    expect(expected).toEqual([usersMock[0]])
  });

  test("Create user without error", async () => {
    const userMock: User = {
      name: `test user ${new Date().getTime()}`,
      email: 'test@user.com',
      password: 'secretpass'
    }
    const response = await createUser({ parameters: { user: userMock } })
    const status = response?.statusCode
    const expected = await userRepository.getUserByEmail(userMock.email)

    expect(status).toEqual(201)
    expect(expected).toEqual({ id: expected?.id, ...userMock })
  });

  test("Update users data with 204 status code", async () => {
    usersMock.forEach(async user => {
      await userRepository.createUser(user)
    })
    while ((await userRepository.listUsers()).length < usersMock.length) { }

    const userForUpdate = await userRepository.getUserByEmail(usersMock[0].email)
    const updatedUser = { ...userForUpdate, name: 'updated name', email: 'updated@email.com' }
    const response = await updateUser({ parameters: { user: updatedUser } })

    const status = response?.statusCode
    const expected = await userRepository.getUserByID(userForUpdate?.id!)

    expect(status).toEqual(204)
    expect(expected).toEqual({ ...updatedUser, id: userForUpdate?.id })
  });

  test("Delete users data with 204 status code", async () => {
    usersMock.forEach(async user => {
      await userRepository.createUser(user)
    })
    while ((await userRepository.listUsers()).length < usersMock.length) { }

    const userForDelete = await userRepository.getUserByEmail(usersMock[0].email)
    const response = await deleteUser({ parameters: { id: userForDelete?.id } })

    const status = response?.statusCode
    const expected = await userRepository.listUsers()

    expect(status).toEqual(204)
    expect(expected).toEqual([{ id: expected[0].id, ...usersMock[1] }])
  });
});
