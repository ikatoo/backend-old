import { init } from "@/server";
import { Server, ServerApplicationState } from "@hapi/hapi";
// import assert from "node:assert";
// import test, { afterEach, beforeEach, describe } from "node:test";

import { afterEach, beforeEach, describe, expect, test } from "vitest";

describe("GET /", () => {
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

  test("version is 0.0.1", async () => {
    const res = await server.inject({
      method: "get",
      url: "/",
    });

    const expected = { version: "0.0.1" };
    const result = res.result;

    expect(expected).toEqual(result);
  });
});
