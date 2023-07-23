import { UsersRepository } from "@/infra/db/PgPromise/Users";
import { User } from "@/repository/IUser";
import { beforeEach, describe, expect, test } from "vitest";
import { findUsersByName } from "./usersPageController";

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

  test.todo("List all users");

  test.todo("Get user by email");

  test("Find user by partial name", async () => {
    usersMock.forEach(async user => {
      await userRepository.createUser(user)
    })

    const response = await findUsersByName({ parameters: { partialName: 'name1' } })
    const { body, statusCode } = response as HandlerResponse
    const expected = (body as User[]).map(user => {
      const { id, ...rest } = user
      return rest
    })

    expect(statusCode).toEqual(200)
    expect(expected).toEqual([usersMock[0]])
  });

  test.todo("Create user without error");

  test.todo("Update users data with 204 status code");

  test.todo("Delete users data with 204 status code");
});
