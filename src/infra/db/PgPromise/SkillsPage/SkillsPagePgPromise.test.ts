import skillPageMock from "@shared/mocks/skillsPageMock/result.json";
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
    const actual = await repository.getSkillsPage();

    expect(skillPageMock).toEqual(actual);
  });

  test("UPDATE Method", async () => {
    await repository.createSkillsPage(skillPageMock);
    const newValue = {
      description: "new description",
      skills: [
        {
          skillTitle: 'skill 1',
        },
        {
          skillTitle: 'skill 2',
        },
        {
          skillTitle: 'skill 3',
        },
      ],
      lastJobs: [
        {
          jobTitle: "new job 1",
          jobDescription: "desc new job 1",
          yearMonthStart: "2021 - 01",
          yearMonthEnd: "2022 - 01",
          link: "https://job1.com.br",
        },
        {
          jobTitle: "new job 2",
          jobDescription: "desc new job 2",
          yearMonthStart: "2022 - 02",
          yearMonthEnd: "2023 - 02",
          link: "https://job2.com.br",
        },
      ]
    };
    await repository.updateSkillsPage(newValue);
    const actual = await repository.getSkillsPage();

    expect({ ...skillPageMock, ...newValue }).toEqual(actual);
  });

  test("DELETE Method", async () => {
    await repository.createSkillsPage(skillPageMock);
    await repository.deleteSkillsPage();
    const expected = undefined;
    const actual = await repository.getSkillsPage();

    expect(expected).toEqual(actual);
  });
});
