import { ProjectsRepository } from "@/infra/db";
import projectsPageMock from "@/mock/projectsPageMock";
import { ProjectWithId } from "@/repository/IProject";
import { Server, ServerApplicationState } from "@hapi/hapi";
import { init } from "hapi/server";
import { afterEach, beforeEach, describe, expect, test } from "vitest";

describe("/project routes", () => {
  const repository = new ProjectsRepository()
  let server: Server<ServerApplicationState>;

  beforeEach(async () => {
    server = await init();
  });

  afterEach(async () => {
    await server.stop();
    await repository.clear()
  });

  test("PUT Method: responds with 405 code when try use put method", async () => {
    const { statusCode } = await server.inject({
      method: "put",
      url: "/project",
    });

    expect(statusCode).toEqual(405);
  })

  test("GET Method: result is equal the mock with 200 statusCode", async () => {
    await repository.createProject(projectsPageMock[1]);
    const { result, statusCode } = await server.inject<ProjectWithId[]>({
      method: "get",
      url: "/projects",
    });
    // const projects = result as ProjectWithId[]
    const { id, ...actual } = (result as ProjectWithId[])[0]

    expect(statusCode).toBe(200);
    expect(actual).toEqual(projectsPageMock[1]);
    expect(result).toHaveLength(1)
  });

  test("GET Method: responds with 204 when not found data", async () => {
    const { statusCode } = await server.inject({
      method: "get",
      url: "/projects",
    });

    expect(statusCode).toBe(204);
  })

  test("POST Method: create project with 204 statusCode", async () => {
    const { statusCode } = await server.inject({
      method: "post",
      url: "/project",
      payload: projectsPageMock[0]
    });
    const title = projectsPageMock[0].description.title
    const projects = await repository.getProjectsByTitle(title) as ProjectWithId[]
    const { id, ...actual } = projects[0]
    expect(statusCode).toBe(201);
    expect(actual).toEqual(projectsPageMock[0])
  });

  test("POST Method: responds with 409 when try create page with existent data", async () => {
    await repository.createProject(projectsPageMock[1]);
    const { statusCode } = await server.inject({
      method: "post",
      url: "/project",
      payload: projectsPageMock[1]
    });

    expect(statusCode).toBe(409);
  })

  test("POST Method: responds with 400 when request without payload", async () => {
    const res = await server.inject({
      method: "post",
      url: "/project",
    });

    expect(res.statusCode).toBe(400);
  })

  test("PATCH Method: responds with 204 when update", async () => {
    await repository.createProject(projectsPageMock[0]);
    const projects = await repository.getProjectsByTitle(projectsPageMock[0].description.title) as ProjectWithId[]
    const { id } = projects[0]
    const res = await server.inject({
      method: "patch",
      url: `/project/id/${id}`,
      payload: { description: { title: 'new title' } }
    });

    expect(res.statusCode).toBe(204);
  });

  test("PATCH Method: responds with 409 when try update with invalid payload", async () => {
    await repository.createProject(projectsPageMock[0]);
    const projects = await repository.getProjectsByTitle(projectsPageMock[0].description.title) as ProjectWithId[]
    const { id } = projects[0]
    const res = await server.inject({
      method: "patch",
      url: `/project/id/${id}`,
      payload: { invalid: 'payload' }
    });

    expect(res.statusCode).toBe(409);
  });

  test("PATCH Method: responds with 400 when try update without payload", async () => {
    await repository.createProject(projectsPageMock[0]);
    const projects = await repository.getProjectsByTitle(projectsPageMock[0].description.title) as ProjectWithId[]
    const { id } = projects[0]
    const res = await server.inject({
      method: "patch",
      url: `/project/id/${id}`,
    });

    expect(res.statusCode).toBe(400);
  });

  test("DELETE Method: responds with 204", async () => {
    await repository.createProject(projectsPageMock[0]);
    const projects = await repository.getProjectsByTitle(projectsPageMock[0].description.title) as ProjectWithId[]
    const { id } = projects[0]
    const res = await server.inject({
      method: "delete",
      url: `/project/id/${id}`,
    });

    expect(res.statusCode).toBe(204);
  });

  test("GET Method: get project with id", async () => {
    await repository.createProject(projectsPageMock[0]);
    const projects = await repository.getProjectsByTitle(projectsPageMock[0].description.title) as ProjectWithId[]
    const { id } = projects[0]
    const { result, statusCode } = await server.inject({
      method: "get",
      url: `/project/id/${id}`,
    });

    expect(statusCode).toBe(200);
    expect(result).toEqual({ id, ...projectsPageMock[0] });
  });

  test("GET Method: should return statusCode 404 when project with id not exist", async () => {
    const { statusCode } = await server.inject({
      method: "get",
      url: '/project/id/1000000',
    });

    expect(statusCode).toBe(404);
  });

  test("GET Method: get project with like title", async () => {
    await repository.createProject(projectsPageMock[0]);
    const { title } = projectsPageMock[0].description
    const { result, statusCode } = await server.inject({
      method: "get",
      url: `/projects/title/${title}`,
    });
    const { id, ...actual } = (result as ProjectWithId[])[0]

    expect(statusCode).toBe(200);
    expect(actual).toEqual(projectsPageMock[0]);
  });

  test("GET Method: should return statusCode 204 when not found data with this title", async () => {
    await repository.createProject(projectsPageMock[0]);
    const { result, statusCode } = await server.inject({
      method: "get",
      url: '/projects/title/sdfsdf',
    });

    expect(statusCode).toBe(204);
    expect(result).toBeNull();
  });

});
