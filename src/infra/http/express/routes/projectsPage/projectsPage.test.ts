import { ProjectsRepository } from "@/infra/db";
import { app } from "@/infra/http/express/server";
import projectsPageMock from "@shared/mocks/projectsMock/result.json";
import request from "supertest";
import { afterEach, describe, expect, test, vi } from "vitest";

describe("EXPRESS: /project routes", () => {
  const mockWithID = projectsPageMock.map((project, id) => ({ id, ...project }))

  afterEach(async () => {
    vi.clearAllMocks()
    vi.restoreAllMocks()
  });

  test("PUT Method: responds with 405 code when try use put method", async () => {
    const { statusCode } = await request(app)
      .put("/projects")
      .send()

    expect(statusCode).toEqual(405);
  })

  test("GET Method: result is equal the mock with 200 statusCode", async () => {
    const spy = vi.spyOn(ProjectsRepository.prototype, 'getProjects')
      .mockResolvedValueOnce(mockWithID)

    const { body, statusCode } = await request(app)
      .get("/projects")
      .send()

    expect(statusCode).toBe(200);
    expect(body).toEqual(mockWithID)
    expect(spy).toHaveBeenCalledTimes(1)
  });

  test("GET Method: responds with 204 when not found data", async () => {
    const spy = vi.spyOn(ProjectsRepository.prototype, 'getProjects')
      .mockResolvedValueOnce([])

    const { body, statusCode } = await request(app)
      .get("/projects")
      .send()

    expect(statusCode).toBe(204);
    expect(body).toEqual({})
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test("POST Method: create project with 204 statusCode", async () => {
    const spy = vi.spyOn(ProjectsRepository.prototype, 'createProject')
      .mockResolvedValueOnce()

    const { statusCode } = await request(app)
      .post("/project")
      .send(projectsPageMock[0])

    expect(statusCode).toBe(201);
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith(projectsPageMock[0])
  });

  test("POST Method: responds with 409 when try create page with existent data", async () => {
    const spy = vi.spyOn(ProjectsRepository.prototype, 'createProject')
      .mockImplementationOnce(() => { throw new Error('duplicate') })

    const { statusCode } = await request(app)
      .post("/project")
      .send(projectsPageMock[0])

    expect(statusCode).toBe(409);
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith(projectsPageMock[0])
  })

  test("POST Method: responds with 400 when request without payload", async () => {
    const { statusCode } = await request(app)
      .post("/project")
      .send()

    expect(statusCode).toBe(400);
  })

  test("PATCH Method: responds with 204 when update", async () => {
    const mockedID = 8
    const mockedData = { description: { title: 'new title' } }
    const spy = vi.spyOn(ProjectsRepository.prototype, 'updateProject')
      .mockResolvedValueOnce()

    const { statusCode } = await request(app)
      .patch(`/project/id/${mockedID}`)
      .send(mockedData)

    expect(statusCode).toBe(204);
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith(mockedID, mockedData)
  });

  test("PATCH Method: responds with 409 when try update with invalid payload", async () => {
    const { statusCode } = await request(app)
      .patch(`/project/id/5`)
      .send({ invalid: 'payload' })

    expect(statusCode).toBe(409);
  });

  test("PATCH Method: responds with 400 when try update without payload", async () => {
    const { statusCode } = await request(app)
      .patch(`/project/id/6`)
      .send()

    expect(statusCode).toBe(400);
  });

  test("DELETE Method: responds with 204", async () => {
    const spy = vi.spyOn(ProjectsRepository.prototype, 'deleteProject')
      .mockResolvedValueOnce()

    const { statusCode } = await request(app)
      .delete(`/project/id/99`)
      .send()

    expect(statusCode).toBe(204);
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith(99)
  });

  test("GET Method: get project with id", async () => {
    const mockedData = mockWithID[1]
    const spy = vi.spyOn(ProjectsRepository.prototype, 'getProjectById')
      .mockResolvedValueOnce(mockedData)

    const { statusCode, body } = await request(app)
      .get(`/project/id/${mockedData.id}`)
      .send()

    expect(statusCode).toBe(200);
    expect(body).toEqual(mockedData);
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith(mockedData.id)
  });

  test("GET Method: should return statusCode 404 when project with id not exist", async () => {
    const spy = vi.spyOn(ProjectsRepository.prototype, 'getProjectById')
      .mockResolvedValueOnce(undefined)

    const { statusCode } = await request(app)
      .get('/project/id/1000000')
      .send()

    expect(statusCode).toBe(404);
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith(1000000)
  });

  test("GET Method: get project with like title", async () => {
    const mockedTitle = 'mocked_title'
    const spy = vi.spyOn(ProjectsRepository.prototype, 'getProjectsByTitle')
      .mockResolvedValueOnce(mockWithID)

    const { statusCode, body } = await request(app)
      .get(`/projects/title/${mockedTitle}`)
      .send()

    expect(statusCode).toBe(200);
    expect(body).toEqual(mockWithID)
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith(mockedTitle)
  });

  test("GET Method: should return statusCode 204 when not found data with this title", async () => {
    const mockedTitle = 'sdfsdf'
    const spy = vi.spyOn(ProjectsRepository.prototype, 'getProjectsByTitle')
      .mockResolvedValueOnce(undefined)

    const { statusCode, body } = await request(app)
      .get(`/projects/title/${mockedTitle}`)
      .send()

    expect(statusCode).toBe(204);
    expect(body).toEqual({})
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith(mockedTitle)
  });

});
