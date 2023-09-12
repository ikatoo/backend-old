import { AboutPageRepository } from "@/infra/db";
import { AboutPage } from "@/repository/IAboutPage";
import { Server, ServerApplicationState } from "@hapi/hapi";
import aboutPageMock from "@shared/mocks/aboutPageMock/result.json";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { init } from "../../server";

describe("/about routes", () => {
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
    const { statusCode } = await server.inject<AboutPage>({
      method: "put",
      url: "/about",
    });

    expect(statusCode).toEqual(405);
  })

  test("GET Method: result is equal the mock and status code 200", async () => {
    const spy = vi.spyOn(AboutPageRepository.prototype, 'getAboutPage')
      .mockResolvedValueOnce(aboutPageMock)

    const { result, statusCode } = await server.inject<HandlerResponse>({
      method: "get",
      url: "/about",
    });

    expect(result).toEqual(aboutPageMock);
    expect(statusCode).toEqual(200)
    expect(spy).toHaveBeenCalledTimes(1)
  });

  test("GET Method: responds with 200 statusCode when there is no data to return", async () => {
    const spy = vi.spyOn(AboutPageRepository.prototype, 'getAboutPage')
      .mockResolvedValueOnce(undefined)

    const { result, statusCode } = await server.inject({
      method: "get",
      url: "/about",
    });

    expect(statusCode).toBe(200);
    expect(result).toEqual({})
    expect(spy).toHaveBeenCalledTimes(1)
  });

  test("POST Method: responds with 201", async () => {
    const spy = vi.spyOn(AboutPageRepository.prototype, 'createAboutPage')
      .mockResolvedValueOnce()

    const res = await server.inject({
      method: "post",
      url: "/about",
      payload: aboutPageMock
    });

    expect(res.statusCode).toBe(201);
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith(aboutPageMock)
  });

  test("POST Method: responds with 409 when try create with existent data", async () => {
    const spy = vi.spyOn(AboutPageRepository.prototype, 'createAboutPage')
      .mockImplementationOnce(() => {
        throw new Error("duplicate");
      })

    const res = await server.inject({
      method: "post",
      url: "/about",
      payload: aboutPageMock
    });

    expect(res.statusCode).toBe(409);
    expect(res.result).toHaveProperty('message')
    expect(
      (res.result as { message: string }).message
    ).toEqual('Duplicated data.')
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith(aboutPageMock)
  });

  test("POST Method: responds with 400 when request without payload", async () => {
    const res = await server.inject({
      method: "post",
      url: "/about",
    });

    expect(res.statusCode).toBe(400);
  });

  test("PATCH Method: responds with 204 when update", async () => {
    const mockedData = { title: 'new title' }
    const spy = vi.spyOn(AboutPageRepository.prototype, 'updateAboutPage').mockResolvedValueOnce()
    
    const res = await server.inject({
      method: "patch",
      url: "/about",
      payload: mockedData
    });

    expect(res.statusCode).toBe(204);
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith(mockedData)
  });

  test("PATCH Method: responds with 409 when try update with invalid payload", async () => {
    const res = await server.inject({
      method: "patch",
      url: "/about",
      payload: { invalid: 'payload' }
    });

    expect(res.statusCode).toBe(409);
  });

  test("PATCH Method: responds with 400 when try update without payload", async () => {
    const res = await server.inject({
      method: "patch",
      url: "/about",
    });

    expect(res.statusCode).toBe(400);
  });

  test("DELETE Method: responde with status 204", async () => {
    const spy = vi.spyOn(AboutPageRepository.prototype, 'deleteAboutPage').mockResolvedValueOnce()
    
    const { statusCode } = await server.inject({
      method: "delete",
      url: "/about",
    });

    expect(statusCode).toBe(204)
    expect(spy).toHaveBeenCalledTimes(1)
  })
});
