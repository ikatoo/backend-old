import { ContactPageRepository } from "@/infra/db";
import { app } from "@/infra/http/express/server";
import contactPageMock from "@/mock/contactPageMock";
import request from "supertest";
import { afterEach, beforeEach, describe, expect, test } from "vitest";

describe("/contact routes", () => {
  const repository = new ContactPageRepository();

  beforeEach(async () => {
  });

  afterEach(async () => {
    await repository.clear()
  });

  test("PUT Method: responds with 405 code when try use put method", async () => {
    const { statusCode } = await request(app)
      .put("/contact")
      .send()

    expect(statusCode).toEqual(405);
  })

  test("GET Method: responds with data and 200 status code", async () => {
    await repository.createContactPage(contactPageMock);
    const { statusCode, body } = await request(app)
      .get("/contact")
      .send()

    expect(statusCode).toEqual(200)
    expect(body).toEqual(contactPageMock);
  });

  test("GET Method: responds with 204 when not found data", async () => {
    const { statusCode, body } = await request(app)
      .get("/contact")
      .send()

    expect(statusCode).toBe(204);
    expect(body).toEqual({})
  });

  test("POST Method: create contact page with 204 statusCode", async () => {
    const { statusCode } = await request(app)
      .post("/contact")
      .send(contactPageMock)
    const page = await repository.getContactPage()

    expect(statusCode).toBe(201);
    expect(page).toEqual(contactPageMock)
  });

  test("POST Method: responds with 409 when try create page with existent data", async () => {
    await repository.createContactPage(contactPageMock);
    const { statusCode } = await request(app)
      .post("/contact")
      .send(contactPageMock)

    expect(statusCode).toBe(409);
  })

  test("POST Method: responds with 400 when request without payload", async () => {
    const { statusCode } = await request(app)
      .post("/contact")
      .send()

    expect(statusCode).toBe(400);
  })

  test("PATCH Method: responds with 204 when update", async () => {
    const { statusCode } = await request(app)
      .patch("/contact")
      .send({ title: 'new title' })

    expect(statusCode).toBe(204);
  });

  test("PATCH Method: responds with 409 when try update with invalid payload", async () => {
    await repository.createContactPage(contactPageMock);
    const { statusCode } = await request(app)
      .patch("/contact")
      .send({ invalid: 'payload' })

    expect(statusCode).toBe(409);
  });

  test("PATCH Method: responds with 400 when try update without payload", async () => {
    const { statusCode } = await request(app)
      .patch("/contact")
      .send()

    expect(statusCode).toBe(400);
  });

  test("DELETE Method: responde with status 204", async () => {
    await repository.createContactPage(contactPageMock);
    const { statusCode } = await request(app)
      .delete("/contact")
      .send()
    const actual = await repository.getContactPage()

    expect(statusCode).toBe(204)
    expect(actual).toBeUndefined()
  })

});
