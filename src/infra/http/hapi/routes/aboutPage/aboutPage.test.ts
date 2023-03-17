import { Server, ServerApplicationState } from "@hapi/hapi";
import { afterEach, beforeEach, describe, expect, test } from "vitest";
import { init } from "hapi/server";
import aboutPageMock from "@/mock/aboutPageMock";
import { AboutPageRepository } from "@/infra/db";

describe("/about routes", () => {
  const repository = new AboutPageRepository();
  let server: Server<ServerApplicationState>;

  beforeEach(async () => {
    server = await init();
  });

  afterEach(async () => {
    await server.stop();
  });

  test("result is equal the mock", async () => {
    await repository.createAboutPage(aboutPageMock);
    const res = await server.inject({
      method: "get",
      url: "/about",
    });

    expect(res.result).toEqual(aboutPageMock);
  });

  test("responds with 200", async () => {
    const res = await server.inject({
      method: "get",
      url: "/about",
    });

    expect(res.statusCode).toBe(200);
  });
});
