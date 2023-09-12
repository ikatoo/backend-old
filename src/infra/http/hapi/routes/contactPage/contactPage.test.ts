import { ContactPageRepository } from "@/infra/db";
import { ContactPage } from "@/repository/IContactPage";
import { Server, ServerApplicationState } from "@hapi/hapi";
import contactPageMock from "@shared/mocks/contactPageMock/result.json";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { init } from "../../server";

describe("/contact routes", () => {
  let server: Server<ServerApplicationState>;

  beforeEach(async () => {
    server = await init();
  });

  afterEach(async () => {
    await server.stop();
    vi.clearAllMocks()
    vi.restoreAllMocks()
  });

  test("PUT Method: responds with 405 code when try use put method", async () => {
    const { statusCode } = await server.inject<ContactPage>({
      method: "put",
      url: "/contact",
    });

    expect(statusCode).toEqual(405);
  })

  test("GET Method: responds with data and 200 status code", async () => {
    const spy = vi.spyOn(ContactPageRepository.prototype, 'getContactPage')
      .mockResolvedValueOnce(contactPageMock)

    const { result, statusCode } = await server.inject({
      method: "get",
      url: "/contact",
    });

    expect(statusCode).toEqual(200)
    expect(result).toEqual(contactPageMock);
    expect(spy).toHaveBeenCalledTimes(1)
  });

  test("GET Method: responds with 200 when not found data", async () => {
    const spy = vi.spyOn(ContactPageRepository.prototype, 'getContactPage')
      .mockResolvedValueOnce(undefined)

    const { statusCode, result } = await server.inject({
      method: "get",
      url: "/contact",
    });

    expect(statusCode).toBe(200);
    expect(result).toEqual(null)
    expect(spy).toHaveBeenCalledTimes(1)
  });

  test("POST Method: create contact page with 204 statusCode", async () => {
    const spy = vi.spyOn(ContactPageRepository.prototype, 'createContactPage')
      .mockResolvedValueOnce()

    const { statusCode } = await server.inject({
      method: "post",
      url: "/contact",
      payload: contactPageMock
    });

    expect(statusCode).toBe(201);
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith(contactPageMock)
  });

  test("POST Method: responds with 409 when try create page with existent data", async () => {
    const spy = vi.spyOn(ContactPageRepository.prototype, 'createContactPage')
      .mockImplementationOnce(() => {
        throw new Error("duplicate");
      })

    const { statusCode, result } = await server.inject({
      method: "post",
      url: "/contact",
      payload: contactPageMock
    });

    expect(statusCode).toBe(409);
    expect(result).toHaveProperty('message')
    expect(
      (result as { message: string }).message
    ).toEqual('Duplicated data.')
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith(contactPageMock)
  })

  test("POST Method: responds with 400 when request without payload", async () => {
    const res = await server.inject({
      method: "post",
      url: "/contact",
    });

    expect(res.statusCode).toBe(400);
  })

  test("PATCH Method: responds with 204 when update", async () => {
    const mockedData = { title: 'new title' }
    const spy = vi.spyOn(ContactPageRepository.prototype, 'updateContactPage')
      .mockResolvedValueOnce()

    const res = await server.inject({
      method: "patch",
      url: "/contact",
      payload: mockedData
    });

    expect(res.statusCode).toBe(204);
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith(mockedData)
  });

  test("PATCH Method: responds with 409 when try update with invalid payload", async () => {
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
    const spy = vi.spyOn(ContactPageRepository.prototype, 'deleteContactPage')
      .mockResolvedValueOnce()

    const { statusCode } = await server.inject({
      method: "delete",
      url: "/contact",
    });

    expect(statusCode).toBe(204)
    expect(spy).toHaveBeenCalledTimes(1)
  })

});
