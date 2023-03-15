import { aboutPageMock } from "@/mock/aboutPageMock";
import { init } from "@/server";
import { Server, ServerApplicationState } from "@hapi/hapi";
import { afterEach, beforeEach, describe, expect, test } from "vitest";
// import assert from "node:assert";
// import test, { afterEach, beforeEach, describe } from "node:test";

describe("/about routes", () => {
  let server: Server<ServerApplicationState>;

  beforeEach(async () => {
    server = await init();
  });

  afterEach(async () => {
    await server.stop();
  });

  test("responds with 200", async () => {
    const res = await server.inject({
      method: "get",
      url: "/",
    });

    expect(res.statusCode).toBe(200);
  });

  test("result is equal the mock", async () => {
    const res = await server.inject({
      method: "get",
      url: "/about",
    });

    const expected = JSON.stringify(aboutPageMock);
    const actual = JSON.stringify(res.result);

    expect(actual).toBe(expected);
  });
});
