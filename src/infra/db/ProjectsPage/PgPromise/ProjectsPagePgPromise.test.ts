import { afterEach, beforeAll, describe, expect, test } from "vitest";
import db from "./db";
import ProjectsPagePgPromise from "./ProjectsPagePgPromise";

describe("Basic operations in ProjectsPage Postgres Database", () => {
  const repository = new ProjectsPagePgPromise();

  beforeAll(async () => {
    await db.connect();
  });

  afterEach(async () => {
    await db.none("delete from projects_page;");
  });

  test("CREATE Method", async () => {
    const pageMock = {
      title: 'project title',
      description: 'description',
    };
    await expect(repository.createProjectsPage(pageMock))
      .resolves.not.toThrow()
  });

  test("READ Method", async () => {
    const pageMock = {
      title: 'project title',
      description: 'description',
    };
    await repository.createProjectsPage(pageMock);
    const pageInDb = await db.one(
      "select * from projects_page where title = $1",
      pageMock.title,
    );
    const expected = { id: pageInDb.id, ...pageMock };
    const actual = await repository.getProjectsPage();

    expect(expected).toEqual(actual);
  });

  test("UPDATE Method", async () => {
    const pageMock = {
      title: 'project title',
      description: 'description',
    };
    await repository.createProjectsPage(pageMock);
    const pageInDb = await db.one(
      "select * from projects_page where title = $1",
      pageMock.title,
    );
    const newValue = {
      description: "new description",
    };
    await repository.updateProjectsPage(newValue);
    const expected = { id: pageInDb.id, ...pageMock, ...newValue };
    const actual = await repository.getProjectsPage();

    expect(expected).toEqual(actual);
  });

  test("DELETE Method", async () => {
    const pageMock = {
      title: 'project title',
      description: 'description',
    };
    await repository.createProjectsPage(pageMock);
    await repository.deleteProjectsPage();
    const expected = {};
    const actual = await repository.getProjectsPage();

    expect(expected).toEqual(actual);
  });
});