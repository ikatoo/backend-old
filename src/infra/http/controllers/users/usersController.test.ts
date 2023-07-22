import { UsersRepository } from "@/infra/db/PgPromise/Users";
import { User } from "@/repository/IUser";
import { afterEach, describe, expect, test } from "vitest";

describe("User Controller test", () => {
  const userRepository = new UsersRepository()
  const userMock: User = {
    name: 'test name',
    email: 'teste@email.com',
    password: 'senhasecreta'
  }

  afterEach(async () => {
    await userRepository.clear()
  })

  test.todo("List all users");

  test.todo("Get user by email");

  test.todo("Find user by partial name");

  test.todo("Create user without error");

  test.todo("Update users data with 204 status code");

  test.todo("Delete users data with 204 status code");
});
