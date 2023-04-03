import { AboutPageRepository } from "@/infra/db";
import db from "@/infra/db/PgPromise";
import aboutPageMock from "@/mock/aboutPageMock";
import { AboutPage } from "@/repository/IAboutPage";
import { Server, ServerApplicationState } from "@hapi/hapi";
import { init } from "hapi/server";
import { afterEach, beforeEach, describe, expect, test } from "vitest";

describe("/about routes", () => {
  const aboutPageRepository = new AboutPageRepository();
  let server: Server<ServerApplicationState>;

  beforeEach(async () => {
    server = await init();
  });

  afterEach(async () => {
    await db.none('delete from about_page;')
    await server.stop();
  });

  test("PUT Method: responds with 405 code when try use put method", async () => {
    const { statusCode } = await server.inject<AboutPage>({
      method: "put",
      url: "/about",
    });

    expect(statusCode).toEqual(405);
  })

  test("GET Method: result is equal the mock", async () => {
    await aboutPageRepository.createAboutPage(aboutPageMock);
    const { result } = await server.inject<AboutPage>({
      method: "get",
      url: "/about",
    });

    expect(result).toEqual(aboutPageMock);
  });

  test("GET Method: responds with 200", async () => {
    await aboutPageRepository.createAboutPage(aboutPageMock);
    const res = await server.inject({
      method: "get",
      url: "/about",
    });

    expect(res.statusCode).toBe(200);
  });

  test("GET Method: responds with data", async () => {
    await aboutPageRepository.createAboutPage(aboutPageMock);
    const res = await server.inject({
      method: "get",
      url: "/about",
    });

    expect(res.result).toEqual(aboutPageMock);
  });

  test("GET Method: responds with 204 statusCode when there is no data to return", async () => {
    const res = await server.inject({
      method: "get",
      url: "/about",
    });

    expect(res.statusCode).toBe(204);
  });

  test("POST Method: responds with 204", async () => {
    const res = await server.inject({
      method: "post",
      url: "/about",
      payload: aboutPageMock
    });

    expect(res.statusCode).toBe(201);
  });

  test("POST Method: responds with 409", async () => {
    await aboutPageRepository.createAboutPage(aboutPageMock);
    const res = await server.inject({
      method: "post",
      url: "/about",
      payload: aboutPageMock
    });

    expect(res.statusCode).toBe(409);
  });

  test("POST Method: responds with 400 when request without payload", async () => {
    const res = await server.inject({
      method: "post",
      url: "/about",
    });

    expect(res.statusCode).toBe(400);
  });

  test("PATCH Method: responds with 204 when update", async () => {
    const res = await server.inject({
      method: "patch",
      url: "/about",
      payload: { title: 'new title' }
    });

    expect(res.statusCode).toBe(204);
  });

  test("PATCH Method: responds with 409 when try update with invalid payload", async () => {
    await aboutPageRepository.createAboutPage(aboutPageMock);
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
    await aboutPageRepository.createAboutPage(aboutPageMock);
    const { statusCode } = await server.inject({
      method: "delete",
      url: "/about",
    });
    const actual = await aboutPageRepository.getAboutPage()

    expect(statusCode).toBe(204)
    expect(actual).toBeUndefined()
  })
});
