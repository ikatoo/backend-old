import { AboutPageRepository } from "@/infra/db";
import aboutPageMock from "@/mock/aboutPageMock";
import request from "supertest";
import { afterEach, describe, expect, test } from "vitest";
import { app } from "../../server";

describe("EXPRESS: /about routes", () => {
  const aboutPageRepository = new AboutPageRepository();

  afterEach(async () => {
    await aboutPageRepository.clear()
  });

  test("PUT Method: responds with 405 code when try use put method", async () => {
    const { statusCode } = await request(app)
      .put('/about')
      .send()

    expect(statusCode).toEqual(405);
  })

  test("GET Method: result is equal the mock and status code 200", async () => {
    await aboutPageRepository.createAboutPage(aboutPageMock);
    const { body, statusCode } = await request(app).get('/about').send()

    expect(body).toEqual(aboutPageMock);
    expect(statusCode).toEqual(200)
  });

  test("GET Method: responds with 204 statusCode when there is no data to return", async () => {
    const { body, statusCode } = await request(app).get('/about').send()

    expect(statusCode).toBe(204);
    expect(body).toEqual({})
  });

  test("POST Method: responds with 204", async () => {
    const { body, statusCode } = await request(app)
      .post('/about')
      .send(aboutPageMock)

    expect(statusCode).toBe(201);
  });

  test("POST Method: responds with 409 when try create with existent data", async () => {
    await aboutPageRepository.createAboutPage(aboutPageMock);
    const { body, statusCode } = await request(app)
      .post('/about')
      .send(aboutPageMock)

    expect(statusCode).toBe(409);
    expect(body).toHaveProperty('message')
    expect(body.message).toEqual('Duplicated data.')
  });

  test("POST Method: responds with 400 when request without payload", async () => {
    const { statusCode } = await request(app)
      .post('/about')
      .send()

    expect(statusCode).toBe(400);
  });

  test("PATCH Method: responds with 204 when update", async () => {
    await aboutPageRepository.createAboutPage(aboutPageMock);
    const { statusCode } = await request(app)
      .patch('/about')
      .send({ title: 'new title' })

    expect(statusCode).toBe(204);
  });

  test("PATCH Method: responds with 409 when try update with invalid payload", async () => {
    await aboutPageRepository.createAboutPage(aboutPageMock);
    const { statusCode } = await request(app)
      .patch('/about')
      .send({ invalid: 'payload' })

    expect(statusCode).toBe(409);
  });

  test("PATCH Method: responds with 400 when try update without payload", async () => {
    const { statusCode } = await request(app)
      .patch('/about')
      .send()

    expect(statusCode).toBe(400);
  });

  test("DELETE Method: responde with status 204", async () => {
    await aboutPageRepository.createAboutPage(aboutPageMock);
    const { statusCode } = await request(app)
      .delete('/about')
      .send()
    const actual = await aboutPageRepository.getAboutPage()

    expect(statusCode).toBe(204)
    expect(actual).toBeUndefined()
  })
});
