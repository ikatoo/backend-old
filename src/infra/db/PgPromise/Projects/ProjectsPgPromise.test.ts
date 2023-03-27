import { afterEach, beforeAll, describe, expect, test } from "vitest";
import db from "..";
import ProjectsPgPromise from "./ProjectsPgPromise";

describe("Basic operations in Projects Postgres Database", () => {
  const repository = new ProjectsPgPromise();

  afterEach(async () => {
    await db.none("delete from projects;");
  });

  test("CREATE and READ Method", async () => {
    const now = new Date(new Date().toDateString())
    const projectMock = {
      title: 'project title',
      description: 'description',
      snapshot: 'projc snap',
      githubLink: 'http://link_to_github',
      lastUpdate: now
    };
    await repository.createProject(projectMock);
    const projectInDb = await db.one(
      "select * from projects where title = $1",
      projectMock.title,
    );
    const expected = [{ id: projectInDb.id, ...projectMock }];
    const actual = await repository.getProjects();

    expect(expected).toEqual(actual);
  });

  test("UPDATE Method", async () => {
    const now = new Date(new Date().toDateString())
    const projectMock = {
      title: 'project title',
      description: 'description',
      snapshot: 'projc snap',
      githubLink: 'http://link_to_github',
      lastUpdate: now
    };
    await repository.createProject(projectMock);
    const projectInDb = await db.one(
      "select * from projects where title = $1",
      projectMock.title,
    );
    const newValue = {
      description: "new description",
    };
    await repository.updateProject(projectInDb.id, newValue);
    const expected = [{ id: projectInDb.id, ...projectMock, ...newValue }];
    const actual = await repository.getProjects();

    expect(expected).toEqual(actual);
  });

  test("DELETE Method", async () => {
    const now = new Date(new Date().toDateString())
    const projectMock = {
      title: 'project title',
      description: 'description',
      snapshot: 'projc snap',
      githubLink: 'http://link_to_github',
      lastUpdate: now
    };
    await repository.createProject(projectMock);
    const projectInDb = await db.one(
      "select * from projects where title = $1",
      projectMock.title,
    );
    await repository.deleteProject(projectInDb.id);
    const expected: [] = [];
    const actual = await repository.getProjects();

    expect(expected).toEqual(actual);
  });
});