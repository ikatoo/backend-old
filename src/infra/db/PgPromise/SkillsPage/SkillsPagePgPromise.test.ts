import skillPageMock from "@/mock/skillPageMock";
import { afterEach, describe, expect, test } from "vitest";
import db from "..";
import SkillsPagePgPromise from "./SkillsPagePgPromise";

describe("Basic operations in SkillsPage PgPromise Database", () => {
  const repository = new SkillsPagePgPromise();

  afterEach(async () => {
    await db.none('delete from skills_page;')
  })

  test("CREATE Method", async () => {
    await expect(repository.createSkillsPage(skillPageMock))
      .resolves.not.toThrow()
  });

  test("READ Method", async () => {
    await repository.createSkillsPage(skillPageMock);
    const { lastJobs, skills, ...rest } = skillPageMock
    const actual = await repository.getSkillsPage();
    const expected = { id: actual.id, ...rest };

    expect(expected).toEqual(actual);
  });

  test("UPDATE Method", async () => {
    await repository.createSkillsPage(skillPageMock);
    const newValue = {
      description: "new description",
    };
    await repository.updateSkillsPage(newValue);
    const { lastJobs, skills, ...rest } = skillPageMock
    const actual = await repository.getSkillsPage();
    const expected = { id: actual.id, ...rest, ...newValue };

    expect(expected).toEqual(actual);
  });

  test("DELETE Method", async () => {
    await repository.createSkillsPage(skillPageMock);
    await repository.deleteSkillsPage();
    const expected = undefined;
    const actual = await repository.getSkillsPage();

    expect(expected).toEqual(actual);
  });
});
