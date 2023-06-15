import { ContactPageRepository } from "@/infra/db";
import { ContactPage } from "@/repository/IContactPage";
import { Server, ServerApplicationState } from "@hapi/hapi";
import contactPageMock from "@shared/mocks/contactPageMock/result.json";
import { afterEach, beforeEach, describe, expect, test } from "vitest";
import { init } from "../../server";

describe("/contact routes", () => {
  const repository = new ContactPageRepository();
  let server: Server<ServerApplicationState>;

  beforeEach(async () => {
    server = await init();
  });

  afterEach(async () => {
    await server.stop();
    await repository.clear()
  });

  test("PUT Method: responds with 405 code when try use put method", async () => {
    const { statusCode } = await server.inject<ContactPage>({
      method: "put",
      url: "/contact",
    });

    expect(statusCode).toEqual(405);
  })

  test("GET Method: responds with data", async () => {
    await repository.createContactPage(contactPageMock);
    const res = await server.inject({
      method: "get",
      url: "/contact",
    });

    expect(res.result).toEqual(contactPageMock);
  });

  test("GET Method: responds with 204 when not found data", async () => {
    const { statusCode } = await server.inject({
      method: "get",
      url: "/contact",
    });

    expect(statusCode).toBe(204);
  });

  test("GET Method: result is equal the mock with 200 statusCode", async () => {
    await repository.createContactPage(contactPageMock);
    const { result, statusCode } = await server.inject<HandlerResponse>({
      method: "get",
      url: "/contact",
    });

    expect(result).toEqual(contactPageMock);
    expect(statusCode).toBe(200);
  });

  test("POST Method: create contact page with 204 statusCode", async () => {
    const { statusCode } = await server.inject({
      method: "post",
      url: "/contact",
      payload: contactPageMock
    });
    const page = await repository.getContactPage()

    expect(statusCode).toBe(201);
    expect(page).toEqual(contactPageMock)
  });

  test("POST Method: responds with 409 when try create page with existent data", async () => {
    await repository.createContactPage(contactPageMock);
    const { statusCode } = await server.inject({
      method: "post",
      url: "/contact",
      payload: contactPageMock
    });

    expect(statusCode).toBe(409);
  })

  test("POST Method: responds with 400 when request without payload", async () => {
    const res = await server.inject({
      method: "post",
      url: "/contact",
    });

    expect(res.statusCode).toBe(400);
  })

  test("PATCH Method: responds with 204 when update", async () => {
    const res = await server.inject({
      method: "patch",
      url: "/contact",
      payload: { title: 'new title' }
    });

    expect(res.statusCode).toBe(204);
  });

  test("PATCH Method: responds with 409 when try update with invalid payload", async () => {
    await repository.createContactPage(contactPageMock);
    const res = await server.inject({
      method: "patch",
      url: "/contact",
      payload: { invalid: 'payload' }
    });

    expect(res.statusCode).toBe(409);
  });

  test("PATCH Method: responds with 400 when try update without payload", async () => {
    const res = await server.inject({
      method: "patch",
      url: "/contact",
    });

    expect(res.statusCode).toBe(400);
  });

  test("DELETE Method: responde with status 204", async () => {
    await repository.createContactPage(contactPageMock);
    const { statusCode } = await server.inject({
      method: "delete",
      url: "/contact",
    });
    const actual = await repository.getContactPage()

    expect(statusCode).toBe(204)
    expect(actual).toBeUndefined()
  })

});
