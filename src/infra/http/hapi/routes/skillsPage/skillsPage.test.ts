import { SkillsPageRepository } from "@/infra/db";
import skillPageMock from "@/mock/skillPageMock";
import { SkillsPage } from "@/repository/ISkillsPage";
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
    await repository.clear()
  });

  test("PUT Method: responds with 405 code when try use put method", async () => {
    const { statusCode } = await server.inject<SkillsPage>({
      method: "put",
      url: "/skills",
    });

    expect(statusCode).toEqual(405);
  })

  test("GET Method: responds with data", async () => {
    await repository.createSkillsPage(skillPageMock);
    const res = await server.inject({
      method: "get",
      url: "/skills",
    });

    expect(res.result).toEqual(skillPageMock);
  });

  test("GET Method: responds with 404", async () => {
    const { statusCode } = await server.inject({
      method: "get",
      url: "/skills",
    });

    expect(statusCode).toBe(404);
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

  test("POST Method: create skills page with 204 statusCode", async () => {
    const { statusCode } = await server.inject({
      method: "post",
      url: "/skills",
      payload: skillPageMock
    });
    const page = await repository.getSkillsPage()

    expect(statusCode).toBe(204);
    expect(page).toEqual(skillPageMock)
  });

  test("GET Method: responds with 404 when not found data", async () => {
    const { statusCode } = await server.inject({
      method: "get",
      url: "/skills",
    });

    expect(statusCode).toBe(404);
  })

  test("GET Method: responds with 409 when try create page with existent data", async () => {
    await repository.createSkillsPage(skillPageMock);
    const { statusCode } = await server.inject({
      method: "post",
      url: "/skills",
      payload: skillPageMock
    });

    expect(statusCode).toBe(409);
  })

  test("POST Method: responds with 400 when request without payload", async () => {
    const res = await server.inject({
      method: "post",
      url: "/skills",
    });

    expect(res.statusCode).toBe(400);
  })

  test("PATCH Method: responds with 204 when update", async () => {
    const res = await server.inject({
      method: "patch",
      url: "/skills",
      payload: { title: 'new title' }
    });

    expect(res.statusCode).toBe(204);
  });

  test("PATCH Method: responds with 409 when try update with invalid payload", async () => {
    await repository.createSkillsPage(skillPageMock);
    const res = await server.inject({
      method: "patch",
      url: "/skills",
      payload: { invalid: 'payload' }
    });

    expect(res.statusCode).toBe(409);
  });

  test("PATCH Method: responds with 400 when try update without payload", async () => {
    const res = await server.inject({
      method: "patch",
      url: "/skills",
    });

    expect(res.statusCode).toBe(400);
  });;

  test("DELETE Method: responde with status 204", async () => {
    await repository.createSkillsPage(skillPageMock);
    const { statusCode } = await server.inject({
      method: "delete",
      url: "/skills",
    });
    const actual = await repository.getSkillsPage()

    expect(statusCode).toBe(204)
    expect(actual).toBeUndefined()
  })

});
