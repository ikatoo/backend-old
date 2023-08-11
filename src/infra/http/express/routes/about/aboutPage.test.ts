import { AboutPageRepository } from "@/infra/db";
import aboutPageMock from "@shared/mocks/aboutPageMock/result.json";
import request from "supertest";
import { afterEach, describe, expect, test, vi } from "vitest";
import { app } from "../../server";

describe("EXPRESS: /about routes", () => {
  afterEach(async () => {
    vi.clearAllMocks()
    vi.restoreAllMocks()
    vi.resetAllMocks()
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

  test("POST Method: responds with 204", async () => {
    const spy = vi.spyOn(AboutPageRepository.prototype, 'createAboutPage').mockResolvedValueOnce()
    const { statusCode } = await request(app)
      .post('/about')
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

    const { statusCode } = await request(app)
      .post('/about')
      .send()

    expect(statusCode).toBe(400);
    expect(spy).toHaveBeenCalledTimes(0)
  });

  test("PATCH Method: responds with 204 when update", async () => {
    const mockedData = { title: 'new title' }
    const spy = vi.spyOn(AboutPageRepository.prototype, 'updateAboutPage').mockResolvedValueOnce()

    const { statusCode } = await request(app)
      .patch('/about')
      .send(mockedData)

    expect(statusCode).toBe(204);
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith(mockedData)
  });
  
  test("PATCH Method: responds with 409 when try update with invalid payload", async () => {
    const mockedData = { invalid: 'payload' }
    const spy = vi.spyOn(AboutPageRepository.prototype, 'updateAboutPage').mockResolvedValueOnce()
    
    const { statusCode } = await request(app)
    .patch('/about')
    .send(mockedData)
    
    expect(statusCode).toBe(409);
    expect(spy).toHaveBeenCalledTimes(0)
  });

  test("PATCH Method: responds with 400 when try update without payload", async () => {
    const { statusCode } = await request(app)
      .patch('/about')
      .send()

    expect(statusCode).toBe(400);
  });

  test("DELETE Method: responde with status 204", async () => {
    const spy = vi.spyOn(AboutPageRepository.prototype, 'deleteAboutPage').mockResolvedValueOnce()
    const { statusCode } = await request(app)
      .delete('/about')
      .send()

    expect(statusCode).toBe(204)
    expect(spy).toHaveBeenCalledTimes(1)
  })
});
