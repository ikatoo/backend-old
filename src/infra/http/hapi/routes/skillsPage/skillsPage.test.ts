import { SkillsPageRepository } from "@/infra/db";
import skillPageMock from "@/mock/skillPageMock";
import { Server, ServerApplicationState } from "@hapi/hapi";
import { init } from "hapi/server";
import { afterEach, beforeEach, describe, expect, test } from "vitest";

describe("/skills routes", () => {
  const repository = new SkillsPageRepository();
  let server: Server<ServerApplicationState>;

  beforeEach(async () => {
    server = await init();
  });

  afterEach(async () => {
    await server.stop();
    repository.clear()
  });

  test("GET Method: result is equal the mock with 200 statusCode", async () => {
    await repository.createSkillsPage(skillPageMock);
    const { result, statusCode } = await server.inject({
      method: "get",
      url: "/skills",
    });

    expect(result).toEqual(skillPageMock);
    expect(statusCode).toBe(200);
  });
});
