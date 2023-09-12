import { ProjectsRepository } from "@/infra/db";
import projectsPageMock from "@shared/mocks/projectsMock/result.json";
import { afterEach, describe, expect, test, vi } from "vitest";
import {
  createProjectHandler,
  deleteProjectHandler,
  getProjectByIDHandler,
  getProjectsByTitleHandler,
  getProjectsHandler,
  updateProjectHandler
} from "./projectsPageController";

describe("ProjectsPage Controller test", () => {

  afterEach(async () => {
    vi.clearAllMocks()
    vi.restoreAllMocks()
  })

  const mockWithId = projectsPageMock.map((project, id) => ({ ...project, id }))

  test("Get projects", async () => {
    const spy = vi.spyOn(ProjectsRepository.prototype, 'getProjects').mockResolvedValueOnce(mockWithId)
    const result = await getProjectsHandler()

    expect(result?.body).toEqual(mockWithId);
    expect(spy).toHaveBeenCalledTimes(1)
  });

  test("Create projects page data without error", async () => {
    const mockedData = projectsPageMock[0]
    const spy = vi.spyOn(ProjectsRepository.prototype, 'createProject').mockResolvedValueOnce()

    await expect(createProjectHandler({ parameters: { data: mockedData } }))
      .resolves.not.toThrow()
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith(mockedData)
  });

  test("Update projects page data without error", async () => {
    const mockedData = {
      description: {
        title: 'new title',
        content: 'new Description'
      }
    }
    const spy = vi.spyOn(ProjectsRepository.prototype, 'updateProject').mockResolvedValueOnce()

    await expect(updateProjectHandler({
      parameters: {
        data: {
          id: 7,
          ...mockedData
        }
      }
    }))
      .resolves.not.toThrow()
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith(7, mockedData)
  });

  test("Delete projects page with 204 status code", async () => {
    const spy = vi.spyOn(ProjectsRepository.prototype, 'deleteProject').mockResolvedValueOnce()

    await expect(deleteProjectHandler({ parameters: { data: { id: 9 } } }))
      .resolves.not.toThrow()
    expect(spy).toHaveBeenCalledTimes(1)
  });

  test("Get projects with similar title", async () => {
    const expected = [mockWithId[1]]
    const spy = vi.spyOn(ProjectsRepository.prototype, 'getProjectsByPartialTitle')
      .mockResolvedValueOnce(expected)
    const title = mockWithId[1].description.title

    const result = await getProjectsByTitleHandler({ parameters: { data: { title } } })

    expect(result?.body).toEqual(expected);
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith(title)
  });

  test("Get projects by id", async () => {
    const expected = mockWithId[1]
    const spy = vi.spyOn(ProjectsRepository.prototype, 'getProjectById')
      .mockResolvedValueOnce(expected)
    const result = await getProjectByIDHandler({ parameters: { data: { id: expected.id } } })

    expect(result?.body).toEqual(expected);
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith(expected.id)
  });
});
