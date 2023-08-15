import { AboutPageRepository } from "@/infra/db";
import { UsersRepository } from "@/infra/db/PgPromise/Users";
import { env } from "@/utils/env";
import aboutPageMock from "@shared/mocks/aboutPageMock/result.json";
import { sign } from "jsonwebtoken";
import request from "supertest";
import { afterEach, describe, expect, test, vi } from "vitest";
import { app } from "../../server";
import * as AuthController from '@/infra/http/controllers/auth/authController'

describe("EXPRESS: /about routes", () => {
  const userMock = {
    id: 1,
    name: 'test name1',
    email: 'teste1@email.com',
    password: 'pass'
  }

  afterEach(async () => {
    vi.clearAllMocks()
    vi.restoreAllMocks()
    vi.restoreAllMocks()
  });

  test("PUT Method: responds with 405 code when try use put method", async () => {
    const { statusCode } = await request(app)
      .put('/about')
      .send()

    expect(statusCode).toEqual(405);
  })

  test("GET Method: result is equal the mock and status code 200", async () => {
    const spy = vi.spyOn(AboutPageRepository.prototype, 'getAboutPage').mockResolvedValueOnce(aboutPageMock)
    const { body, statusCode } = await request(app).get('/about').send()

    expect(body).toEqual(aboutPageMock);
    expect(statusCode).toEqual(200)
    expect(spy).toHaveBeenCalledTimes(1)
  });

  test("GET Method: responds with 204 statusCode when there is no data to return", async () => {
    const spy = vi.spyOn(AboutPageRepository.prototype, 'getAboutPage').mockResolvedValueOnce(undefined)
    const { body, statusCode } = await request(app).get('/about').send()

    expect(statusCode).toBe(204);
    expect(body).toEqual({})
    expect(spy).toHaveBeenCalledTimes(1)
  });

  test("POST Method: responds with statusCode 401 and Unauthorized message", async () => {
    const { statusCode, body } = await request(app)
      .post('/about')
      .set('Authorization', `Bearer invalid-token`)
      .send(aboutPageMock)

    expect(statusCode).toBe(401);
    expect(body.message).toEqual('Unauthorized')
  });

  test("POST Method: responds with 201", async () => {
    const spy = vi.spyOn(AboutPageRepository.prototype, 'createAboutPage').mockResolvedValueOnce()
    vi.spyOn(UsersRepository.prototype, 'getUserByID')
      .mockResolvedValueOnce(userMock)

    const accessToken = sign(
      { id: userMock.id },
      env.JWT_SECRET,
      { expiresIn: '1h' }
    )
    const { statusCode } = await request(app)
      .post('/about')
      .set('Authorization', `Bearer ${accessToken}`)
      .send(aboutPageMock)

    expect(statusCode).toBe(201);
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith(aboutPageMock)
  });

  test("POST Method: responds with 409 when try create with existent data", async () => {
    const spy = vi.spyOn(AboutPageRepository.prototype, 'createAboutPage')
      .mockImplementationOnce(() => {
        throw new Error("duplicate");
      })
    vi.spyOn(AuthController, 'verifyToken').mockResolvedValueOnce({ statusCode: 200 })

    const { body, statusCode } = await request(app)
      .post('/about')
      .send(aboutPageMock)

    expect(statusCode).toBe(409);
    expect(body).toHaveProperty('message')
    expect(body.message).toEqual('Duplicated data.')
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith(aboutPageMock)
  });

  test("POST Method: responds with 400 when request without payload", async () => {
    const spy = vi.spyOn(AboutPageRepository.prototype, 'createAboutPage').mockResolvedValueOnce()
    vi.spyOn(AuthController, 'verifyToken').mockResolvedValueOnce({ statusCode: 200 })

    const { statusCode } = await request(app)
      .post('/about')
      .send()

    expect(statusCode).toBe(400);
    expect(spy).toHaveBeenCalledTimes(0)
  });

  test("PATCH Method: responds with 401 when update without token", async () => {
    const { statusCode, body } = await request(app)
      .patch('/about')
      .send()

    expect(statusCode).toBe(401);
    expect(body.message).toBe('Unauthorized');
  });

  test("PATCH Method: responds with 204 when update", async () => {
    vi.spyOn(AboutPageRepository.prototype, 'createAboutPage').mockResolvedValueOnce()
    vi.spyOn(UsersRepository.prototype, 'getUserByID')
      .mockResolvedValueOnce(userMock)
    const accessToken = sign(
      { id: userMock.id },
      env.JWT_SECRET,
      { expiresIn: '1h' }
    )
    const mockedData = { title: 'new title' }
    const spy = vi.spyOn(AboutPageRepository.prototype, 'updateAboutPage').mockResolvedValueOnce()

    const { statusCode } = await request(app)
      .patch('/about')
      .set('Authorization', `Bearer ${accessToken}`)
      .send(mockedData)

    expect(statusCode).toBe(204);
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith(mockedData)
  });

  test("PATCH Method: responds with 409 when try update with invalid payload", async () => {
    const mockedData = { invalid: 'payload' }
    const spy = vi.spyOn(AboutPageRepository.prototype, 'updateAboutPage').mockResolvedValueOnce()
    vi.spyOn(AuthController, 'verifyToken').mockResolvedValueOnce({ statusCode: 200 })

    const { statusCode } = await request(app)
      .patch('/about')
      .send(mockedData)

    expect(statusCode).toBe(409);
    expect(spy).toHaveBeenCalledTimes(0)
  });

  test("PATCH Method: responds with 400 when try update without payload", async () => {
    vi.spyOn(AuthController, 'verifyToken').mockResolvedValueOnce({ statusCode: 200 })
    const { statusCode } = await request(app)
      .patch('/about')
      .send()

    expect(statusCode).toBe(400);
  });

  test("DELETE Method: responde with status 401 when call without token", async () => {
    const { statusCode, body } = await request(app)
      .delete('/about')
      .send()

    expect(statusCode).toBe(401)
    expect(body.message).toBe('Unauthorized')
  })

  test("DELETE Method: responde with status 204", async () => {
    vi.spyOn(UsersRepository.prototype, 'getUserByID')
      .mockResolvedValueOnce(userMock)
    const accessToken = sign(
      { id: userMock.id },
      env.JWT_SECRET,
      { expiresIn: '1h' }
    )
    const spy = vi.spyOn(AboutPageRepository.prototype, 'deleteAboutPage').mockResolvedValueOnce()
    const { statusCode } = await request(app)
      .delete('/about')
      .set('Authorization', `Bearer ${accessToken}`)
      .send()

    expect(statusCode).toBe(204)
    expect(spy).toHaveBeenCalledTimes(1)
  })
});
