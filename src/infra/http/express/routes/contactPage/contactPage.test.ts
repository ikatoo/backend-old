import { ContactPageRepository } from "@/infra/db";
import { app } from "@/infra/http/express/server";
import contactPageMock from "@shared/mocks/contactPageMock/result.json";
import request from "supertest";
import { afterEach, describe, expect, test, vi } from "vitest";

describe("/contact routes", () => {
  const repository = new ContactPageRepository();

  afterEach(async () => {
    vi.clearAllMocks()
    vi.restoreAllMocks()
  });

  test("PUT Method: responds with 405 code when try use put method", async () => {
    const { statusCode } = await request(app)
      .put("/contact")
      .send()

    expect(statusCode).toEqual(405);
  })

  test("GET Method: responds with data and 200 status code", async () => {
    const spy = vi.spyOn(ContactPageRepository.prototype, 'getContactPage')
      .mockResolvedValueOnce(contactPageMock)

    const { statusCode, body } = await request(app)
      .get("/contact")
      .send()

    expect(statusCode).toEqual(200)
    expect(body).toEqual(contactPageMock);
    expect(spy).toHaveBeenCalledTimes(1)
  });

  test("GET Method: responds with 204 when not found data", async () => {
    const spy = vi.spyOn(ContactPageRepository.prototype, 'getContactPage')
      .mockResolvedValueOnce(undefined)

    const { statusCode, body } = await request(app)
      .get("/contact")
      .send()

    expect(statusCode).toBe(204);
    expect(body).toEqual({})
    expect(spy).toHaveBeenCalledTimes(1)
  });

  test("POST Method: create contact page with 204 statusCode", async () => {
    const spy = vi.spyOn(ContactPageRepository.prototype, 'createContactPage')
      .mockResolvedValueOnce()

    const { statusCode } = await request(app)
      .post("/contact")
      .send(contactPageMock)

    expect(statusCode).toBe(201);
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith(contactPageMock)
  });

  test("POST Method: responds with 409 when try create page with existent data", async () => {
    const spy = vi.spyOn(ContactPageRepository.prototype, 'createContactPage')
      .mockImplementationOnce(() => {
        throw new Error("duplicate");
      })

    const { body, statusCode } = await request(app)
      .post("/contact")
      .send(contactPageMock)

    expect(statusCode).toBe(409);
    expect(body).toHaveProperty('message')
    expect(body.message).toEqual('Duplicated data.')
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith(contactPageMock)
  })

  test("POST Method: responds with 400 when request without payload", async () => {
    const { statusCode } = await request(app)
      .post("/contact")
      .send()

    expect(statusCode).toBe(400);
  })

  test("PATCH Method: responds with 204 when update", async () => {
    const mockedData = { title: 'new title' }
    const spy = vi.spyOn(ContactPageRepository.prototype, 'updateContactPage')
      .mockResolvedValueOnce()

    const { statusCode } = await request(app)
      .patch("/contact")
      .send(mockedData)

    expect(statusCode).toBe(204);
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith(mockedData)
  });

  test("PATCH Method: responds with 409 when try update with invalid payload", async () => {
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
    const spy = vi.spyOn(ContactPageRepository.prototype, 'deleteContactPage')
      .mockResolvedValueOnce()

    const { statusCode } = await request(app)
      .delete("/contact")
      .send()

    expect(statusCode).toBe(204)
    expect(spy).toHaveBeenCalledTimes(1)
  })
});
