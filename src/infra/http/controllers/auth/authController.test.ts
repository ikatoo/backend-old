import { UsersRepository } from "@/infra/db/PgPromise/Users";
import * as crypto from "@/utils/hasher";
import jwt from "jsonwebtoken";
import { afterEach, describe, expect, test, vi } from "vitest";
import { authentication } from "./authController";

describe("Auth Controller test", () => {
  const mock = {
    id: 1,
    name: 'test name1',
    email: 'teste1@email.com',
    password: 'pass'
  }

  afterEach(() => {
    vi.clearAllMocks()
    vi.restoreAllMocks()
  })

  test("Auth user with success", async () => {
    vi.spyOn(UsersRepository.prototype, 'getUserByEmail')
      .mockResolvedValueOnce(mock)
    vi.spyOn(crypto, 'compareHash').mockResolvedValueOnce(true)
    vi.spyOn(jwt, 'sign').mockImplementation(() => ('valid-access-token'))

    const result = await authentication({
      parameters: { email: mock.email, password: mock.password }
    })

    expect(result?.statusCode).toEqual(200)
    expect(result?.body).toHaveProperty('accessToken', 'valid-access-token')
  });

  test("Fail on try auth user with invalid parameters", async () => {
    await expect(authentication({
      parameters: { invalid: 'parameter' }
    })).rejects.toThrowError('Invalid parameters')
  })

  test("Fail on try auth user with invalid email", async () => {
    vi.spyOn(UsersRepository.prototype, 'getUserByEmail')
      .mockResolvedValueOnce(undefined)

    await expect(authentication({
      parameters: { email: 'invalid@email.com', password: 'somepass' }
    })).rejects.toThrowError('Invalid email or password')
  })

  test("Fail on try auth user with invalid password", async () => {
    vi.spyOn(UsersRepository.prototype, 'getUserByEmail')
      .mockResolvedValueOnce(mock)
    vi.spyOn(crypto, 'compareHash').mockResolvedValueOnce(false)

    await expect(authentication({
      parameters: { email: mock.email, password: 'invalidpass' }
    })).rejects.toThrowError('Invalid email or password')
  })

  test("Fail on try auth user when database access is fail", async () => {
    vi.spyOn(UsersRepository.prototype, 'getUserByEmail')
      .mockImplementationOnce(() => {
        throw new Error();
      })

    await expect(authentication({
      parameters: { email: mock.email, password: mock.password }
    })).rejects.toThrowError()
  })
});
