import { SkillsPageRepository } from "@/infra/db/SkillsPage";
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
  });

  test("result is equal the mock", async () => {
    await repository.createSkillsPage(skillPageMock);
    const res = await server.inject({
      method: "get",
      url: "/skills",
    });

    expect(res.result).toEqual(skillPageMock);
  });

  test("responds with 200", async () => {
    const res = await server.inject({
      method: "get",
      url: "/skills",
    });

    expect(res.statusCode).toBe(200);
  });
});
