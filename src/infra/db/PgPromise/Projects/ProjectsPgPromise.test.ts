import projectsPageMock from "@/mock/projectsPageMock";
import { afterEach, describe, expect, test } from "vitest";
import db from "..";
import ProjectsPgPromise from "./ProjectsPgPromise";

describe("Basic operations in Projects Postgres Database", () => {
  const repository = new ProjectsPgPromise();

  afterEach(async () => {
    await db.none("delete from projects;");
  });

  test("CREATE Method", async () => {
    for (const project of projectsPageMock) {
      await expect(repository.createProject(project))
        .resolves.not.toThrow()
    }
  });

  test("READ Method", async () => {
    for (const project of projectsPageMock) {
      await repository.createProject(project)
    }
    const projects = await repository.getProjects()
    const actual = projects.map(project => {
      const { id, ...rest } = project
      return rest
    })

    expect(projectsPageMock).toEqual(actual)
  });

  // test("UPDATE Method", async () => {
  //   await repository.createProject(projectsPageMock[0])
  //   const newValue = {
  //     description: {
  //       title: "new description"
  //     }
  //   };
  //   const projects = await repository.getProjects()
  //   await repository.updateProject(projects[0].id, newValue);
  //   const newProjects = await repository.getProjects()
  //   const expected = {
  //     snapshot: '/images/snap-calm.png',
  //     description: {
  //       title: 'Calm Organizador de Criptomoedas',
  //       subTitle: 'Last update: 2022 - 03',
  //       content: newValue.description.title
  //     },
  //     githubLink: 'https://github.com/mckatoo/calm'
  //   }
  //   const actual = newProjects[0]

  //   console.log('expected =====\n', expected)
  //   console.log('actual =====\n', actual)

  //   expect(expected).toEqual(actual);
  // });

  // test("DELETE Method", async () => {
  //   const now = new Date(new Date().toDateString())
  //   const projectMock = {
  //     title: 'project title',
  //     description: 'description',
  //     snapshot: 'projc snap',
  //     githubLink: 'http://link_to_github',
  //     lastUpdate: now
  //   };
  //   await repository.createProject(projectMock);
  //   const projectInDb = await db.one(
  //     "select * from projects where title = $1",
  //     projectMock.title,
  //   );
  //   await repository.deleteProject(projectInDb.id);
  //   const expected: [] = [];
  //   const actual = await repository.getProjects();

  //   expect(expected).toEqual(actual);
  // });
});