import { UsersRepository } from '@/infra/db/PgPromise/Users'
import { User } from '@/repository/IUser'
import * as cryptoUtils from "@/utils/hasher"
import jwt from 'jsonwebtoken'
import request from 'supertest'
import { describe, expect, test, vi } from "vitest"
import { app } from '../../server'

describe("EXPRESS: /auth routes", () => {
  test("PUT Method: responds with 405 code when try use put method", async () => {
    const { statusCode } = await request(app)
      .put("/auth")
      .send()

    expect(statusCode).toEqual(405);
  })

  test("POST Method: responds with 204 code when sucess on verify token", async () => {
    const mockedUser = {
      id: 1,
      name: 'test name1',
      email: 'teste1@email.com',
      password: 'pass'
    }
    vi.spyOn(jwt, 'verify').mockImplementation(() => ({ id: mockedUser.id }))
    vi.spyOn(UsersRepository.prototype, 'getUserByID')
      .mockResolvedValueOnce(mockedUser)

    const { statusCode } = await request(app)
      .post("/auth/verify-token")
      .set("authorization", 'Bearer valid-token')
      .send()

    expect(statusCode).toEqual(204);
  })

  test("POST Method: responds with 401 code when fail on verify token", async () => {
    const { statusCode } = await request(app)
      .post("/auth/verify-token")
      .send()

    expect(statusCode).toEqual(401);
  })

  test("POST Method: responds with 401 stausCode when fail on autenticate user", async () => {
    const { statusCode } = await request(app)
      .post("/auth/sign-in")
      .send({
        email: 'fail@user.com',
        password: 'failpass'
      })

    expect(statusCode).toEqual(401);
  })

  test(
    "POST Method: responds with 200 stausCode and accessToken when success on authenticate user",
    async () => {
      const mockedUser: User = {
        name: 'Valid User',
        email: 'valid@login.com',
        password: 'validpass',
        id: 7
      }
      vi.spyOn(UsersRepository.prototype, 'getUserByEmail').mockResolvedValueOnce(mockedUser)
      vi.spyOn(cryptoUtils, 'compareHash').mockResolvedValueOnce(true)
      vi.spyOn(jwt, 'sign').mockImplementation(() => ('valid-access-token'))

      const { statusCode, body } = await request(app)
        .post("/auth/sign-in")
        .send({
          email: mockedUser.email,
          password: mockedUser.password
        })

      expect(statusCode).toEqual(200);
      expect(body.accessToken).toEqual('valid-access-token')
    })
})