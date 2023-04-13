import { ProjectsRepository } from "@/infra/db";
import { app } from "@/infra/http/express/server";
import projectsPageMock from "@/mock/projectsPageMock";
import { ProjectWithId } from "@/repository/IProject";
import request from "supertest";
import { afterEach, describe, expect, test } from "vitest";

describe("EXPRESS: /project routes", () => {
  const repository = new ProjectsRepository()

  afterEach(async () => {
    await repository.clear()
  });

  test("PUT Method: responds with 405 code when try use put method", async () => {
    const { statusCode } = await request(app)
      .put("/projects")
      .send()

    expect(statusCode).toEqual(405);
  })

  test("GET Method: result is equal the mock with 200 statusCode", async () => {
    await repository.createProject(projectsPageMock[1]);
    const { body, statusCode } = await request(app)
      .get("/projects")
      .send()
    const { id, ...actual } = body[0]

    expect(statusCode).toBe(200);
    expect(actual).toEqual(projectsPageMock[1]);
    expect(body).toHaveLength(1)
  });

  test("GET Method: responds with 204 when not found data", async () => {
    const { body, statusCode } = await request(app)
      .get("/projects")
      .send()

    expect(statusCode).toBe(204);
    expect(body).toEqual({})
  })

  test("POST Method: create project with 204 statusCode", async () => {
    const { statusCode } = await request(app)
      .post("/project")
      .send(projectsPageMock[0])
    const title = projectsPageMock[0].description.title
    const projects = await repository.getProjectsByTitle(title) as ProjectWithId[]
    const { id, ...actual } = projects[0]
    expect(statusCode).toBe(201);
    expect(actual).toEqual(projectsPageMock[0])
  });

  test("POST Method: responds with 409 when try create page with existent data", async () => {
    await repository.createProject(projectsPageMock[1]);
    const { statusCode } = await request(app)
      .post("/project")
      .send(projectsPageMock[1])

    expect(statusCode).toBe(409);
  })

  test("POST Method: responds with 400 when request without payload", async () => {
    const { statusCode } = await request(app)
      .post("/project")
      .send()

    expect(statusCode).toBe(400);
  })

  test("PATCH Method: responds with 204 when update", async () => {
    await repository.createProject(projectsPageMock[0]);
    const projects = await repository.getProjectsByTitle(projectsPageMock[0].description.title) as ProjectWithId[]
    const { id } = projects[0]
    const { statusCode } = await request(app)
      .patch(`/project/id/${id}`)
      .send({ description: { title: 'new title' } })

    expect(statusCode).toBe(204);
  });

  test("PATCH Method: responds with 409 when try update with invalid payload", async () => {
    await repository.createProject(projectsPageMock[0]);
    const projects = await repository.getProjectsByTitle(projectsPageMock[0].description.title) as ProjectWithId[]
    const { id } = projects[0]
    const { statusCode } = await request(app)
      .patch(`/project/id/${id}`)
      .send({ invalid: 'payload' })

    expect(statusCode).toBe(409);
  });

  test("PATCH Method: responds with 400 when try update without payload", async () => {
    await repository.createProject(projectsPageMock[0]);
    const projects = await repository.getProjectsByTitle(projectsPageMock[0].description.title) as ProjectWithId[]
    const { id } = projects[0]
    const { statusCode } = await request(app)
      .patch(`/project/id/${id}`)
      .send()

    expect(statusCode).toBe(400);
  });

  test("DELETE Method: responds with 204", async () => {
    await repository.createProject(projectsPageMock[0]);
    const projects = await repository.getProjectsByTitle(projectsPageMock[0].description.title) as ProjectWithId[]
    const { id } = projects[0]
    const { statusCode } = await request(app)
      .delete(`/project/id/${id}`)
      .send()

    expect(statusCode).toBe(204);
  });

  test("GET Method: get project with id", async () => {
    await repository.createProject(projectsPageMock[0]);
    const projects = await repository.getProjectsByTitle(projectsPageMock[0].description.title) as ProjectWithId[]
    const { id } = projects[0]
    const { statusCode, body } = await request(app)
      .get(`/project/id/${id}`)
      .send()

    expect(statusCode).toBe(200);
    expect(body).toEqual({ id, ...projectsPageMock[0] });
  });

  test("GET Method: should return statusCode 404 when project with id not exist", async () => {
    const { statusCode } = await request(app)
      .get('/project/id/1000000')
      .send()

    expect(statusCode).toBe(404);
  });

  test("GET Method: get project with like title", async () => {
    await repository.createProject(projectsPageMock[0]);
    const { title } = projectsPageMock[0].description
    const { statusCode, body } = await request(app)
      .get(`/projects/title/${title}`)
      .send()
    const { id, ...actual } = (body as ProjectWithId[])[0]

    expect(statusCode).toBe(200);
    expect(actual).toEqual(projectsPageMock[0]);
  });

  test("GET Method: should return statusCode 204 when not found data with this title", async () => {
    await repository.createProject(projectsPageMock[0]);
    const { statusCode, body } = await request(app)
      .get('/projects/title/sdfsdf')
      .send()

    expect(statusCode).toBe(204);
    expect(body).toEqual({})
  });

});
