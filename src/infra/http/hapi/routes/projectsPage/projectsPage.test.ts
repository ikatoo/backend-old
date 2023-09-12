import { ProjectsRepository } from "@/infra/db";
import { ProjectWithId } from "@/repository/IProject";
import { Server, ServerApplicationState } from "@hapi/hapi";
import projectsPageMock from "@shared/mocks/projectsMock/result.json";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { init } from "../../server";

describe("/project routes", () => {
  const mockWithID = projectsPageMock.map((project, id) => ({ id, ...project }))

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
    const { statusCode } = await server.inject({
      method: "put",
      url: "/project",
    });

    expect(statusCode).toEqual(405);
  })

  test("GET Method: result is equal the mock with 200 statusCode", async () => {
    const spy = vi.spyOn(ProjectsRepository.prototype, 'getProjects')
      .mockResolvedValueOnce(mockWithID)

    const { result, statusCode } = await server.inject<ProjectWithId[]>({
      method: "get",
      url: "/projects",
    });

    expect(statusCode).toBe(200);
    expect(result).toEqual(mockWithID)
    expect(spy).toHaveBeenCalledTimes(1)
  });

  test("GET Method: responds with 204 when not found data", async () => {
    const spy = vi.spyOn(ProjectsRepository.prototype, 'getProjects')
      .mockResolvedValueOnce([])

    const { statusCode, result } = await server.inject({
      method: "get",
      url: "/projects",
    });

    expect(statusCode).toBe(204);
    expect(result).toEqual(null)
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test("POST Method: create project with 204 statusCode", async () => {
    const spy = vi.spyOn(ProjectsRepository.prototype, 'createProject')
      .mockResolvedValueOnce()

    const { statusCode } = await server.inject({
      method: "post",
      url: "/project",
      payload: projectsPageMock[0]
    });

    expect(statusCode).toBe(201);
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith(projectsPageMock[0])
  });

  test("POST Method: responds with 409 when try create page with existent data", async () => {
    const spy = vi.spyOn(ProjectsRepository.prototype, 'createProject')
      .mockImplementationOnce(() => { throw new Error('duplicate') })

    const { statusCode } = await server.inject({
      method: "post",
      url: "/project",
      payload: projectsPageMock[1]
    });

    expect(statusCode).toBe(409);
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith(projectsPageMock[1])
  })

  test("POST Method: responds with 400 when request without payload", async () => {
    const res = await server.inject({
      method: "post",
      url: "/project",
    });

    expect(res.statusCode).toBe(400);
  })

  test("PATCH Method: responds with 204 when update", async () => {
    const mockedID = 8
    const mockedData = { description: { title: 'new title' } }
    const spy = vi.spyOn(ProjectsRepository.prototype, 'updateProject')
      .mockResolvedValueOnce()

    const res = await server.inject({
      method: "patch",
      url: `/project/id/${mockedID}`,
      payload: mockedData
    });

    expect(res.statusCode).toBe(204);
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith(mockedID, mockedData)
  });

  test("PATCH Method: responds with 409 when try update with invalid payload", async () => {
    const res = await server.inject({
      method: "patch",
      url: `/project/id/8`,
      payload: { invalid: 'payload' }
    });

    expect(res.statusCode).toBe(409);
  });

  test("PATCH Method: responds with 400 when try update without payload", async () => {
    const res = await server.inject({
      method: "patch",
      url: `/project/id/90`,
    });

    expect(res.statusCode).toBe(400);
  });

  test("DELETE Method: responds with 204", async () => {
    const spy = vi.spyOn(ProjectsRepository.prototype, 'deleteProject')
      .mockResolvedValueOnce()

    const res = await server.inject({
      method: "delete",
      url: `/project/id/88`,
    });

    expect(res.statusCode).toBe(204);
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith(88)
  });

  test("GET Method: get project with id", async () => {
    const mockedData = mockWithID[1]
    const spy = vi.spyOn(ProjectsRepository.prototype, 'getProjectById')
      .mockResolvedValueOnce(mockedData)

    const { result, statusCode } = await server.inject({
      method: "get",
      url: `/project/id/${mockedData.id}`,
    });

    expect(statusCode).toBe(200);
    expect(result).toEqual(mockedData);
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith(mockedData.id)
  });

  test("GET Method: should return statusCode 404 when project with id not exist", async () => {
    const spy = vi.spyOn(ProjectsRepository.prototype, 'getProjectById')
      .mockResolvedValueOnce(undefined)

    const { statusCode } = await server.inject({
      method: "get",
      url: '/project/id/1000000',
    });

    expect(statusCode).toBe(404);
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith(1000000)
  });

  test("GET Method: get project with like title", async () => {
    const mockedTitle = 'mocked_title'
    const spy = vi.spyOn(ProjectsRepository.prototype, 'getProjectsByPartialTitle')
      .mockResolvedValueOnce(mockWithID)

    const { result, statusCode } = await server.inject({
      method: "get",
      url: `/projects/title/${mockedTitle}`,
    });

    expect(statusCode).toBe(200);
    expect(result).toEqual(mockWithID)
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith(mockedTitle)
  });

  test("GET Method: should return statusCode 200 when not found data with this title", async () => {
    const mockedTitle = 'sdfsdf'
    const spy = vi.spyOn(ProjectsRepository.prototype, 'getProjectsByPartialTitle')
      .mockResolvedValueOnce([])

    const { result, statusCode } = await server.inject({
      method: "get",
      url: `/projects/title/${mockedTitle}`,
    });

    expect(statusCode).toBe(200);
    expect(result).toEqual([]);
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith(mockedTitle)
  });

});
