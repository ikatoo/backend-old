import { UsersRepository } from "@/infra/db/PgPromise/Users";
import * as AuthController from '@/infra/http/controllers/auth/authController';
import { app } from "@/infra/http/express/server";
import NodeMailerImplementation from "@/infra/mailer";
import { User } from "@/repository/IUser";
import jwt from 'jsonwebtoken';
import request from "supertest";
import { afterEach, describe, expect, test, vi } from "vitest";

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

  test("GET Method: should expect 401 when without token", async () => {
    const { statusCode } = await request(app)
      .get("/users")
      .send()

    expect(statusCode).toBe(401);
  });

  test("GET Method: list all users with 200 statusCode", async () => {
    vi.spyOn(AuthController, 'verifyToken').mockResolvedValueOnce()
    const expected = usersMock.map(
      (user, id) => ({ id, name: user.name, email: user.email })
    )
    const spy = vi.spyOn(UsersRepository.prototype, 'listUsers')
      .mockResolvedValueOnce(expected)

    const { body, statusCode } = await request(app)
      .get("/users")
      .set('authorization', 'Bearer valid-token')
      .send()

    expect(spy).toHaveBeenCalledTimes(1)
    expect(statusCode).toBe(200);
    expect(body).toEqual(expected);
  });

  test("GET Method: should expect 401 statusCode when without token", async () => {
    const { statusCode } = await request(app)
      .get(`/user/email/${usersMock[0].email}`)
      .send()

    expect(statusCode).toBe(401);
  });

  test("GET Method: get user by email with 200 statusCode", async () => {
    vi.spyOn(AuthController, 'verifyToken').mockResolvedValueOnce()
    const mockedUser = { id: 4, ...usersMock[0] }
    const spy = vi.spyOn(UsersRepository.prototype, 'getUserByEmail')
      .mockResolvedValue(mockedUser)

    const { body, statusCode } = await request(app)
      .get(`/user/email/${mockedUser.email}`)
      .set('authorization', 'Bearer valid-token')
      .send()
    const { password, ...expected } = body

    expect(statusCode).toBe(200);
    expect(body).toEqual(expected)
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith(mockedUser.email)
  });

  test("GET Method: should expect 401 statusCode when without token", async () => {
    const { body, statusCode } = await request(app)
      .get('/users/name/1')
      .send()

    expect(statusCode).toEqual(401)
  })

  test("GET Method: find users by partial name with 200 statusCode", async () => {
    vi.spyOn(AuthController, 'verifyToken').mockResolvedValueOnce()
    const spy = vi.spyOn(UsersRepository.prototype, 'findUsersByName')
      .mockResolvedValueOnce([{
        id: 1,
        name: usersMock[0].name,
        email: usersMock[0].email
      }])

    const { body, statusCode } = await request(app)
      .get('/users/name/1')
      .set('authorization', 'Bearer valid-token')
      .send()

    const expected = [{
      id: 1,
      name: usersMock[0].name,
      email: usersMock[0].email
    }]

    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith('1')
    expect(statusCode).toBe(200);
    expect(body).toEqual(expected);
  });

  test("GET Method: responds with 200 when there is no data to return", async () => {
    vi.spyOn(AuthController, 'verifyToken').mockResolvedValueOnce()
    const spy = vi.spyOn(UsersRepository.prototype, 'listUsers')
      .mockResolvedValueOnce([])

    const { body, statusCode } = await request(app)
      .get("/users")
      .set('authorization', 'Bearer valid-token')
      .send()

    expect(spy).toHaveBeenCalledTimes(1)
    expect(statusCode).toBe(200);
    expect(body).toEqual([]);
  });

  test("POST Method: not create user with and return unauthorized status 401", async () => {
    const { statusCode } = await request(app)
      .post("/user")
      .send(usersMock[1])

    expect(statusCode).toBe(401);
  });

  test("POST Method: create user with 204 statusCode", async () => {
    const spy = vi.spyOn(UsersRepository.prototype, 'createUser')
      .mockResolvedValueOnce({ id: 7 })
    vi.spyOn(AuthController, 'verifyToken').mockResolvedValueOnce()
    vi.spyOn(UsersRepository.prototype, 'getUserByEmail')
      .mockResolvedValueOnce(undefined)
    vi.spyOn(jwt, 'sign').mockImplementation(() => ('valid-access-token'))

    const { statusCode, body } = await request(app)
      .post("/user")
      .set('authorization', 'Bearer valid-access-token')
      .send(usersMock[1])

    expect(statusCode).toBe(201);
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith(usersMock[1])
    expect(body).toEqual({ accessToken: 'valid-access-token' })
  });

  test("POST Method: responds with 409 when try create user with existent email", async () => {
    vi.spyOn(AuthController, 'verifyToken').mockResolvedValueOnce({
      statusCode: 200,
      body: {
        user: {
          name: 'Teste',
          email: 'teste@teste.com',
          id: 7
        }
      }
    })
    vi.spyOn(UsersRepository.prototype, 'getUserByEmail')
      .mockResolvedValueOnce(usersMock[1])

    const { statusCode } = await request(app)
      .post("/user")
      .set('authorization', 'Bearer valid-token')
      .send({ user: usersMock[1] })

    expect(statusCode).toBe(409);
  })

  test("POST Method: responds with 409 when request without payload", async () => {
    vi.spyOn(AuthController, 'verifyToken').mockResolvedValueOnce()
    const { body, statusCode } = await request(app)
      .post("/user")
      .set('Authorization', 'Bearer valid-token')
      .send()

    expect(statusCode).toBe(409);
    expect(body.message).toEqual('Invalid parameters.')
  })

  test("PATCH Method: should expect 401 statusCode when without token", async () => {
    const mockedData = { id: 4, name: 'new name' }
    const { statusCode } = await request(app)
      .patch("/user")
      .send({ user: mockedData })

    expect(statusCode).toBe(401);
  });

  test("PATCH Method: responds with 204 when update", async () => {
    vi.spyOn(AuthController, 'verifyToken').mockResolvedValueOnce()
    const mockedData = { id: 4, name: 'new name' }
    const { id, ...data } = mockedData
    const spy = vi.spyOn(UsersRepository.prototype, 'updateUser')
      .mockResolvedValueOnce()

    const { statusCode } = await request(app)
      .patch("/user")
      .set('authorization', 'Bearer valid-token')
      .send(mockedData)

    expect(statusCode).toBe(204);
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith(id, data)
  });

  test("PATCH Method: responds with 409 when try update with invalid payload", async () => {
    vi.spyOn(AuthController, 'verifyToken').mockResolvedValueOnce()
    const { statusCode } = await request(app)
      .patch("/user")
      .set('authorization', 'Bearer valid-token')
      .send({ invalid: 'payload' })

    expect(statusCode).toBe(409);
  });

  test("PATCH Method: responds with 400 when try update without payload", async () => {
    vi.spyOn(AuthController, 'verifyToken').mockResolvedValueOnce()
    const { body, statusCode } = await request(app)
      .patch("/user")
      .set('authorization', 'Bearer valid-token')
      .send()

    expect(statusCode).toBe(409);
    expect(body.message).toEqual('Invalid parameters.')
  });

  test("DELETE Method: should expect 401 status when without token", async () => {
    const { statusCode, body } = await request(app)
      .delete("/user/id/90")
      .send()

    expect(statusCode).toBe(401)
  });

  test("DELETE Method: response with status 204", async () => {
    vi.spyOn(AuthController, 'verifyToken').mockResolvedValueOnce()
    const spy = vi.spyOn(UsersRepository.prototype, 'deleteUser')
      .mockResolvedValueOnce()

    const { statusCode } = await request(app)
      .delete("/user/id/90")
      .set('authorization', 'Bearer valid-token')
      .send()

    expect(statusCode).toBe(204)
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith(90)
  });

  test("POST Method: response with status 204 when restore the password with success", async () => {
    const userMock = { id: 7, ...usersMock[0] }
    vi.spyOn(UsersRepository.prototype, 'getUserByEmail')
      .mockResolvedValueOnce(userMock)
    vi.spyOn(UsersRepository.prototype, 'updateUser')
      .mockResolvedValueOnce()
    vi.spyOn(NodeMailerImplementation.prototype, 'send')
      .mockResolvedValueOnce({
        accepted: true,
        response: 'ok'
      })

    const { statusCode } = await request(app)
      .post("/user/password-recovery")
      .send({ email: userMock.email })

    expect(statusCode).toBe(204)
  });

  test("POST Method: response with status 409 when email is not valid", async () => {
    vi.spyOn(UsersRepository.prototype, 'getUserByEmail')
      .mockResolvedValueOnce(undefined)

    const { statusCode, body } = await request(app)
      .post("/user/password-recovery")
      .send({ email: 'invalid-email' })

    expect(statusCode).toBe(409)
    expect(body.message).toEqual('Invalid parameters.')
  });

  test("POST Method: response with status 409 when email not exists in the database", async () => {
    vi.spyOn(UsersRepository.prototype, 'getUserByEmail')
      .mockResolvedValueOnce(undefined)

    const { statusCode, body } = await request(app)
      .post("/user/password-recovery")
      .send({ email: 'invalid@email.com' })

    expect(statusCode).toBe(409)
    expect(body.message).toEqual('Invalid parameters.')
  });

  test("POST Method: response with status 500 when fail on send email", async () => {
    const userMock = { id: 7, ...usersMock[0] }
    vi.spyOn(UsersRepository.prototype, 'getUserByEmail')
      .mockResolvedValueOnce(userMock)
    vi.spyOn(UsersRepository.prototype, 'updateUser')
      .mockResolvedValueOnce()
    vi.spyOn(NodeMailerImplementation.prototype, 'send')
      .mockResolvedValueOnce({
        accepted: false,
        response: ''
      })

    const { statusCode, body } = await request(app)
      .post("/user/password-recovery")
      .send({ email: userMock.email })

    expect(statusCode).toEqual(500)
    expect(body.message).toEqual('Internal Server Error')
  });
});
