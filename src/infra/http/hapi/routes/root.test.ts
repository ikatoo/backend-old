import { Server, ServerApplicationState } from "@hapi/hapi";

import { afterEach, beforeEach, describe, expect, test } from "vitest";
import { init } from "../server";

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
    const { result } = await server.inject({
      method: "get",
      url: "/",
    });

    const expected = { version: "0.0.1" };

    expect(expected).toEqual(result);
  });
});
