import { SkillsPageRepository } from "@/infra/db";
import skillPageMock from "@/mock/skillPageMock";
import { Server, ServerApplicationState } from "@hapi/hapi";
import { init } from "hapi/server";
import { afterEach, beforeEach, describe, expect, test } from "vitest";

describe.skip("/skills routes", () => {
  const repository = new SkillsPageRepository();
  let server: Server<ServerApplicationState>;

  beforeEach(async () => {
    server = await init();
  });

  afterEach(async () => {
    await server.stop();
  });

  test("result is equal the mock", async () => {
    const { skills, lastJobs, ...rest } = skillPageMock

    await repository.createSkillsPage(skillPageMock);
    const { result } = await server.inject({
      method: "get",
      url: "/skills",
    });

    expect(result).toEqual(rest);
  });

  test("responds with 200", async () => {
    const res = await server.inject({
      method: "get",
      url: "/skills",
    });

    expect(res.statusCode).toBe(200);
  });
});
