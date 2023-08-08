vi.mock('..')

import { stringToDate } from "@/utils/transformers/dateTransform";
import projectsPageMock from "@shared/mocks/projectsMock/result.json";
import { afterEach, describe, expect, test, vi } from "vitest";
import db from "..";
import ProjectsPgPromise from "./ProjectsPgPromise";

describe("Basic operations in Projects Postgres Database", () => {
  const repository = new ProjectsPgPromise();

  afterEach(async () => {
    await db.none("delete from projects;");
    vi.clearAllMocks()
  });

  test("CREATE Method", async () => {
    const mockedFn = vi.spyOn(db, 'none')
    const mock = projectsPageMock[0]
    await expect(repository.createProject(mock))
      .resolves.not.toThrow()

    expect(mockedFn).toHaveBeenCalledTimes(1)
    expect(mockedFn).toHaveBeenCalledWith(
      'insert into projects (title, description, snapshot, github_link, last_update) values ($1,$2,$3,$4,$5);',
      [
        mock.description.title,
        mock.description.content,
        mock.snapshot,
        mock.githubLink,
        stringToDate(mock.description.subTitle)
      ]
    )
  });

  test("READ Method", async () => {
    const mockedDbResult = projectsPageMock.map((project, index) => ({
      id: index + 1,
      title: project.description.title,
      description: project.description.content,
      last_update: stringToDate(project.description.subTitle.split(': ')[1]),
      github_link: project.githubLink,
      snapshot: project.snapshot,
    }))
    const mockedFn = vi.spyOn(db, 'manyOrNone').mockResolvedValue(mockedDbResult)

    await expect(repository.getProjects()).resolves.not.toThrow()
    expect(mockedFn).toHaveBeenCalledTimes(1)
    expect(mockedFn).toHaveBeenCalledWith('select * from projects;')
  });

  test("get project by id", async () => {
    const project = projectsPageMock[1]
    const mockedFn = vi.spyOn(db, 'oneOrNone').mockResolvedValueOnce({
      id: 1,
      title: project.description.title,
      description: project.description.content,
      last_update: stringToDate(project.description.subTitle.split(': ')[1]),
      github_link: project.githubLink,
      snapshot: project.snapshot,
    })

    await expect(repository.getProjectById(1)).resolves.not.toThrow()
    expect(mockedFn).toHaveBeenCalledTimes(1)
    expect(mockedFn).toHaveBeenCalledWith(
      'select * from projects where id=$1',
      1
    )
  })

  test("get projects by title", async () => {
    const project = projectsPageMock[0]
    const mockedFn = vi.spyOn(db, 'manyOrNone').mockResolvedValueOnce([{
      id: 1,
      title: project.description.title,
      description: project.description.content,
      last_update: stringToDate(project.description.subTitle.split(': ')[1]),
      github_link: project.githubLink,
      snapshot: project.snapshot,
    }])

    await expect(repository.getProjectsByTitle(project.description.title))
      .resolves.not.toThrow()
    expect(mockedFn).toHaveBeenCalledTimes(1)
    expect(mockedFn).toHaveBeenCalledWith(
      `select * from projects where title ilike '%$1:value%'`,
      project.description.title
    )
  })

  test("UPDATE Method", async () => {
    const selectedMock = projectsPageMock[0]
    const mockedFn = vi.spyOn(db, 'none')
    const values = [
      `github_link='${selectedMock.githubLink}'`,
      `snapshot='${selectedMock.snapshot}'`,
      `title='${selectedMock.description.title}'`,
      `description='${selectedMock.description.content}'`,
      `last_update='${stringToDate(selectedMock.description.subTitle.split(': ')[1]).toISOString()}'`
    ].toString()

    await expect(repository.updateProject(7, selectedMock)).resolves.not.toThrow()
    expect(mockedFn).toHaveBeenCalledTimes(1)
    expect(mockedFn).toHaveBeenCalledWith(
      'update projects set $1:raw where id = $2',
      [values, 7]
    )
  });

  test("DELETE Method", async () => {
    const mockedFn = vi.spyOn(db, 'none')

    await expect(repository.deleteProject(9)).resolves.not.toThrow();
    expect(mockedFn).toHaveBeenCalledTimes(1)
    expect(mockedFn).toHaveBeenCalledWith(
      'delete from projects where id = $1',
      9
    )
  });
});