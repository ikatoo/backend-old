import { UsersRepository } from "@/infra/db/PgPromise/Users";
import { User } from "@/repository/IUser";
import * as crypto from "@/utils/hasher";
import { afterEach, describe, expect, test, vi } from "vitest";
import { createUser, deleteUser, findUsersByName, getUserByEmail, listUsers, updateUser } from "./usersController";

describe("User Controller test", () => {
  const usersMock: User[] = [
    {
      id: 1,
      name: 'test name1',
      email: 'teste1@email.com',
      password: 'hash1'
    },
    {
      id: 2,
      name: 'test name2',
      email: 'teste2@email.com',
      password: 'hash2'
    },
  ]

  afterEach(() => {
    vi.clearAllMocks()
    vi.restoreAllMocks()
  })

  test("List all users", async () => {
    const expected = usersMock.map(user => ({
      id: user.id,
      name: user.name,
      email: user.email
    }))
    const spy = vi.spyOn(UsersRepository.prototype, 'listUsers')
      .mockResolvedValueOnce(expected)

    const result = await listUsers()

    expect(result?.statusCode).toEqual(200)
    expect(result?.body).toEqual(expected)
    expect(spy).toHaveBeenCalledTimes(1)
  });

  test("Get user by email", async () => {
    const { password, ...expected } = usersMock[1]
    const spy = vi.spyOn(UsersRepository.prototype, 'getUserByEmail')
      .mockResolvedValueOnce(usersMock[1])
    const result = await getUserByEmail({ parameters: { email: expected.email } })

    expect(result?.statusCode).toEqual(200)
    expect(result?.body).toEqual(expected)
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith(expected.email)
  });

  test("Find user by partial name", async () => {
    const expected = [{
      id: usersMock[0].id,
      name: usersMock[0].name,
      email: usersMock[0].email
    }]
    const spy = vi.spyOn(UsersRepository.prototype, 'findUsersByName')
      .mockResolvedValueOnce(expected)

    const result = await findUsersByName({ parameters: { partialName: 'name1' } })

    expect(result?.statusCode).toEqual(200)
    expect(result?.body).toEqual(expected)
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith('name1')
  });

  test("Create user without error", async () => {
    const userMock: User = {
      name: `test user ${new Date().getTime()}`,
      email: 'test@user.com',
      password: 'pass'
    }
    vi.spyOn(crypto, 'hasher').mockResolvedValueOnce('hash')
    const spy = vi.spyOn(UsersRepository.prototype, 'createUser')
      .mockResolvedValueOnce()
    vi.spyOn(UsersRepository.prototype, 'getUserByEmail')
      .mockResolvedValueOnce(undefined)
    const result = await createUser({ parameters: { user: userMock } })

    expect(result?.statusCode).toEqual(201)
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith(userMock)
  });

  test("Update users data with 204 status code", async () => {
    const { id, ...userMock } = usersMock[0]
    const spy = vi.spyOn(UsersRepository.prototype, 'updateUser')
      .mockResolvedValueOnce()

    const result = await updateUser({ parameters: { user: userMock } })

    expect(result?.statusCode).toEqual(204)
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith(0, userMock)
  });

  test("Delete user data with 204 status code", async () => {
    const spy = vi.spyOn(UsersRepository.prototype, 'deleteUser')
      .mockResolvedValueOnce()

    const result = await deleteUser({ parameters: { id: 8 } })

    expect(result?.statusCode).toEqual(204)
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith(8)
  });
});
