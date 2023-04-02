import projectsPageMock from "@/mock/projectsPageMock";
import { ProjectWithId } from "@/repository/IProject";
import { dateToString } from "@/utils/transformers/dateTransform";
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

  test("get project by id", async () => {
    const selectedProject = projectsPageMock[1]
    await repository.createProject(projectsPageMock[0])
    await repository.createProject(selectedProject)
    const project = await db.one(
      'select * from projects where title = $1',
      selectedProject.description.title
    )
    const { id, ...actual } = await repository.getProjectById(project.id) as ProjectWithId

    expect(selectedProject).toEqual(actual)
  })

  test("get projects by title", async () => {
    const selectedProject = projectsPageMock[0]
    await repository.createProject(projectsPageMock[1])
    await repository.createProject(selectedProject)
    const projects = await repository.getProjectsByTitle(selectedProject.description.title) as ProjectWithId[]
    const { id, ...actual } = projects[0]

    expect(selectedProject).toEqual(actual)
  })

  test("UPDATE Method", async () => {
    const selectedMock = projectsPageMock[0]
    await repository.createProject(selectedMock)
    const newValue = {
      description: {
        title: "new description"
      }
    };
    const project = await db.one(
      'select * from projects where title=$1',
      selectedMock.description.title
    )
    await repository.updateProject(project.id, newValue);
    const updatedProject = await db.one(
      'select * from projects where id=$1',
      project.id
    )
    const expected = {
      snapshot: '/images/snap-calm.png',
      description: {
        title: newValue.description.title,
        subTitle: 'Last update: 2022 - 03',
        content: 'Personal project for learn nextjs.'
      },
      githubLink: 'https://github.com/mckatoo/calm'
    }
    const actual = {
      snapshot: updatedProject.snapshot,
      description: {
        title: updatedProject.title,
        subTitle: `Last update: ${dateToString(updatedProject.last_update)}`,
        content: updatedProject.description
      },
      githubLink: updatedProject.github_link

    }

    expect(expected).toEqual(actual);
  });

  test("DELETE Method", async () => {
    const projectMock = projectsPageMock[0]
    await repository.createProject(projectMock);
    const projectInDb = await db.one(
      "select * from projects where title = $1",
      projectMock.description.title,
    );
    await repository.deleteProject(projectInDb.id);
    const expected: [] = [];
    const actual = await repository.getProjects();

    expect(expected).toEqual(actual);
  });
});