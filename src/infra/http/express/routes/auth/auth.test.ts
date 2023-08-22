import { UsersRepository } from '@/infra/db/PgPromise/Users'
import * as AuthController from '@/infra/http/controllers/auth/authController'
import { User } from '@/repository/IUser'
import * as crypto from "@/utils/hasher"
import request from 'supertest'
import { describe, expect, test, vi } from "vitest"
import { app } from '../../server'
import jwt from 'jsonwebtoken'

describe("EXPRESS: /auth routes", () => {
  test("PUT Method: responds with 405 code when try use put method", async () => {
    const { statusCode } = await request(app)
      .put("/auth")
      .send()

    expect(statusCode).toEqual(405);
  })

  test("POST Method: responds with 204 code when sucess on verify token", async () => {
    vi.spyOn(AuthController, 'verifyToken').mockResolvedValueOnce({ statusCode: 200 })
    const { statusCode } = await request(app)
      .post("/auth/verify-token")
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
      vi.spyOn(crypto, 'compareHash').mockResolvedValueOnce(true)
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