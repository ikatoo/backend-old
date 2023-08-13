import { UsersRepository } from "@/infra/db/PgPromise/Users";
import { app } from "@/infra/http/express/server";
import { User } from "@/repository/IUser";
import request from "supertest";
import { afterEach, describe, expect, test, vi } from "vitest";
import * as criptoUtil from "@/utils/hasher"

describe("EXPRESS: /users routes", () => {
  const usersMock: User[] = [
    {
      name: 'user test1',
      email: 'email@test1.com',
      password: 'pass1'
    },
    {
      name: 'user test2',
      email: 'email@test2.com',
      password: 'pass2'
    },
  ]

  afterEach(async () => {
    vi.clearAllMocks()
    vi.restoreAllMocks()
  });

  test("PUT Method: responds with 405 code when try use put method", async () => {
    const { statusCode } = await request(app)
      .put("/user")
      .send()

    expect(statusCode).toEqual(405);
  })

  test("GET Method: list all users with 200 statusCode", async () => {
    const expected = usersMock.map(
      (user, id) => ({ id, name: user.name, email: user.email })
    )
    const spy = vi.spyOn(UsersRepository.prototype, 'listUsers')
      .mockResolvedValueOnce(expected)

    const { body, statusCode } = await request(app)
      .get("/users")
      .send()

    expect(body).toEqual(expected);
    expect(statusCode).toBe(200);
    expect(spy).toHaveBeenCalledTimes(1)
  });

  test("GET Method: get user by email with 200 statusCode", async () => {
    const mockedUser = { id: 4, ...usersMock[0] }
    const spy = vi.spyOn(UsersRepository.prototype, 'getUserByEmail')
      .mockResolvedValue(mockedUser)

    const { body, statusCode } = await request(app)
      .get(`/user/email/${mockedUser.email}`)
      .send()
    const { password, ...expected } = body

    expect(statusCode).toBe(200);
    expect(body).toEqual(expected)
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith(mockedUser.email)
  });

  test("GET Method: find users by partial name with 200 statusCode", async () => {
    const spy = vi.spyOn(UsersRepository.prototype, 'findUsersByName')
      .mockResolvedValueOnce([{
        id: 1,
        name: usersMock[0].name,
        email: usersMock[0].email
      }])

    const { body, statusCode } = await request(app)
      .get('/users/name/1')
      .send()

    const expected = [{
      id: 1,
      name: usersMock[0].name,
      email: usersMock[0].email
    }]

    expect(body).toEqual(expected);
    expect(statusCode).toBe(200);
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith('1')
  });

  test("GET Method: responds with 204 when there is no data to return", async () => {
    const spy = vi.spyOn(UsersRepository.prototype, 'listUsers')
      .mockResolvedValueOnce([])

    const { body, statusCode } = await request(app)
      .get("/users")
      .send()

    expect(statusCode).toBe(204);
    expect(body).toEqual({});
    expect(spy).toHaveBeenCalledTimes(1)
  });

  test("POST Method: create user with 204 statusCode", async () => {
    const spy = vi.spyOn(UsersRepository.prototype, 'createUser')
      .mockResolvedValueOnce()
    vi.spyOn(UsersRepository.prototype, 'getUserByEmail')
      .mockResolvedValueOnce(undefined)
    vi.spyOn(criptoUtil, 'hasher').mockResolvedValueOnce('hashpass')

    const { statusCode } = await request(app)
      .post("/user")
      .send({ user: usersMock[1] })

    expect(statusCode).toBe(201);
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith({
      name: usersMock[1].name,
      email: usersMock[1].email,
      password: 'hashpass'
    })
  });

  test("POST Method: responds with 409 when try create user with existent email", async () => {
    vi.spyOn(UsersRepository.prototype, 'getUserByEmail')
      .mockResolvedValueOnce(usersMock[1])

    const { statusCode } = await request(app)
      .post("/user")
      .send({ user: usersMock[1] })

    expect(statusCode).toBe(409);
  })

  test("POST Method: responds with 409 when request without payload", async () => {
    const { body, statusCode } = await request(app)
      .post("/user")
      .send()

    expect(statusCode).toBe(409);
    expect(body.message).toEqual('Invalid parameters.')
  })

  test("PATCH Method: responds with 204 when update", async () => {
    const mockedData = { id: 4, name: 'new name' }
    const spy = vi.spyOn(UsersRepository.prototype, 'updateUser')
      .mockResolvedValueOnce()

    const { statusCode } = await request(app)
      .patch("/user")
      .send({ user: mockedData })

    expect(statusCode).toBe(204);
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith(4, mockedData)
  });

  test("PATCH Method: responds with 409 when try update with invalid payload", async () => {
    const { statusCode } = await request(app)
      .patch("/user")
      .send({ invalid: 'payload' })

    expect(statusCode).toBe(409);
  });

  test("PATCH Method: responds with 400 when try update without payload", async () => {
    const { body, statusCode } = await request(app)
      .patch("/user")
      .send()

    expect(statusCode).toBe(409);
    expect(body.message).toEqual('Invalid parameters.')
  });

  test("DELETE Method: responde with status 204", async () => {
    const spy = vi.spyOn(UsersRepository.prototype, 'deleteUser')
      .mockResolvedValueOnce()

    const { statusCode } = await request(app)
      .delete("/user/id/90")
      .send()

    expect(statusCode).toBe(204)
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith(90)
  });
});
