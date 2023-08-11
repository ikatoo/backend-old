import { SkillsPageRepository } from "@/infra/db";
import { SkillsPage } from "@/repository/ISkillsPage";
import { Server, ServerApplicationState } from "@hapi/hapi";
import skillPageMock from "@shared/mocks/skillsPageMock/result.json";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { init } from "../../server";

describe("HAPIJS: /skills routes", () => {
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
    const { statusCode } = await server.inject<SkillsPage>({
      method: "put",
      url: "/skills",
    });

    expect(statusCode).toEqual(405);
  })

  test("GET Method: responds with data and 200 statusCode", async () => {
    const spy = vi.spyOn(SkillsPageRepository.prototype, 'getSkillsPage')
      .mockResolvedValueOnce(skillPageMock)

    const { result, statusCode } = await server.inject({
      method: "get",
      url: "/skills",
    });

    expect(result).toEqual(skillPageMock);
    expect(statusCode).toBe(200);
    expect(spy).toHaveBeenCalledTimes(1)
  });

  test("GET Method: responds with 204 when there is no data to return", async () => {
    const spy = vi.spyOn(SkillsPageRepository.prototype, 'getSkillsPage')
      .mockResolvedValueOnce(undefined)

    const { statusCode, result } = await server.inject({
      method: "get",
      url: "/skills",
    });

    expect(statusCode).toBe(204);
    expect(result).toEqual(null);
    expect(spy).toHaveBeenCalledTimes(1)
  });

  test("POST Method: create skills page with 204 statusCode", async () => {
    const spy = vi.spyOn(SkillsPageRepository.prototype, 'createSkillsPage')
      .mockResolvedValueOnce()

    const { statusCode } = await server.inject({
      method: "post",
      url: "/skills",
      payload: skillPageMock
    });

    expect(statusCode).toBe(201);
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith(skillPageMock)
  });

  test("GET Method: responds with 409 when try create page with existent data", async () => {
    const spy = vi.spyOn(SkillsPageRepository.prototype, 'createSkillsPage')
      .mockImplementationOnce(() => { throw new Error() })

    const { statusCode } = await server.inject({
      method: "post",
      url: "/skills",
      payload: skillPageMock
    });

    expect(statusCode).toBe(409);
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith(skillPageMock)
  })

  test("POST Method: responds with 400 when request without payload", async () => {
    const res = await server.inject({
      method: "post",
      url: "/skills",
    });

    expect(res.statusCode).toBe(400);
  })

  test("PATCH Method: responds with 204 when update", async () => {
    const mockedData = { title: 'new title' }
    const spy = vi.spyOn(SkillsPageRepository.prototype, 'updateSkillsPage')
      .mockResolvedValueOnce()

    const res = await server.inject({
      method: "patch",
      url: "/skills",
      payload: mockedData
    });

    expect(res.statusCode).toBe(204);
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith(mockedData)
  });

  test("PATCH Method: responds with 409 when try update with invalid payload", async () => {
    const {statusCode} = await server.inject({
      method: "patch",
      url: "/skills",
      payload: { invalid: 'payload' }
    });

    expect(statusCode).toBe(409);
  });

  test("PATCH Method: responds with 400 when try update without payload", async () => {
    const res = await server.inject({
      method: "patch",
      url: "/skills",
    });

    expect(res.statusCode).toBe(400);
  });;

  test("DELETE Method: responde with status 204", async () => {
    const spy = vi.spyOn(SkillsPageRepository.prototype, 'deleteSkillsPage')
      .mockResolvedValueOnce()

    const { statusCode } = await server.inject({
      method: "delete",
      url: "/skills",
    });

    expect(statusCode).toBe(204)
    expect(spy).toHaveBeenCalledTimes(1)
  })

});
