import { ProjectsRepository } from "@/infra/db";
import projectsPageMock from "@/mock/projectsPageMock";
import { ProjectWithId } from "@/repository/IProject";
import { afterEach, describe, expect, test } from "vitest";
import {
  createProjectHandler,
  deleteProjectHandler,
  getProjectByIDHandler,
  getProjectsByTitleHandler,
  getProjectsHandler,
  updateProjectHandler
} from "./projectsPageController";

describe("ProjectsPage Controller test", () => {
  const projectsRepository = new ProjectsRepository()

  afterEach(async () => {
    await projectsRepository.clear()
  })

  test("Get projects", async () => {
    await projectsRepository.createProject(projectsPageMock[1])
    const result = await getProjectsHandler()

    expect([{ id: result[0].id, ...projectsPageMock[1] }]).toEqual(result);
  });

  test("Create projects page data without error", async () => {
    await createProjectHandler(projectsPageMock[0])
    const projects = await projectsRepository.getProjectsByTitle(projectsPageMock[0].description.title) as ProjectWithId[]
    const project = projects[0]

    expect({ id: project?.id, ...projectsPageMock[0] }).toEqual(project);
  });

  test("Update projects page data without error", async () => {
    await projectsRepository.createProject(projectsPageMock[0]);
    const newData = {
      description: {
        title: 'new title',
        content: 'new Description'
      }
    }
    const projects = await projectsRepository.getProjectsByTitle(projectsPageMock[0].description.title) as ProjectWithId[]
    const { id } = projects[0]
    await updateProjectHandler(id, newData)
    const { id: updateId, ...actual } = await projectsRepository.getProjectById(id) as ProjectWithId

    expect(actual).toEqual({
      ...projectsPageMock[0],
      ...newData,
      description: {
        ...projectsPageMock[0].description,
        ...newData.description,
      }
    })
  });

  test("Delete projects page data", async () => {
    await projectsRepository.createProject(projectsPageMock[1]);
    const projects = await projectsRepository.getProjectsByTitle(projectsPageMock[1].description.title) as ProjectWithId[]
    const { id } = projects[0]
    await expect(deleteProjectHandler(id))
      .resolves.not.toThrow()
    const actual = await projectsRepository.getProjectById(id)

    expect(actual).toBeUndefined()
  });

  test("Get projects with similar title", async () => {
    await projectsRepository.createProject(projectsPageMock[1])
    const title = projectsPageMock[1].description.title
    const result = await getProjectsByTitleHandler(title)

    expect([{ id: result[0].id, ...projectsPageMock[1] }]).toEqual(result);
  });

  test("Get projects by id", async () => {
    await projectsRepository.createProject(projectsPageMock[1])
    const title = projectsPageMock[1].description.title
    const projects = await projectsRepository.getProjectsByTitle(title) as ProjectWithId[]
    const { id } = projects[0]
    const result = await getProjectByIDHandler(id)

    expect({ id: result?.id, ...projectsPageMock[1] }).toEqual(result);
  });
});
