vi.mock('..')

import { SkillsPage } from "@/repository/ISkillsPage";
import { getFieldsWithValues } from "@/utils/transformers/getFieldsWithValues";
import skillPageMock from "@shared/mocks/skillsPageMock/result.json";
import { afterEach, describe, expect, test, vi } from "vitest";
import db from "..";
import SkillsPagePgPromise from "./SkillsPagePgPromise";

describe("Basic operations in SkillsPage PgPromise Database", () => {
  const repository = new SkillsPagePgPromise();

  afterEach(async () => {
    await db.none('delete from skills_page;')
    vi.clearAllMocks()
  })

  test("CREATE Method", async () => {
    const mockedFn = vi.spyOn(db, 'none')

    await expect(repository.createSkillsPage(skillPageMock))
      .resolves.not.toThrow()
    expect(mockedFn).toHaveBeenCalledTimes(1)
    expect(mockedFn).toHaveBeenCalledWith(
      'insert into skills_page (title, description, skills, last_jobs) values ($1,$2,$3,$4);',
      [
        skillPageMock.title,
        skillPageMock.description,
        JSON.stringify(skillPageMock.skills),
        JSON.stringify(skillPageMock.lastJobs)
      ],
    )
  });

  test("READ Method", async () => {
    const mockedFn = vi.spyOn(db, 'oneOrNone').mockResolvedValueOnce({
      title: skillPageMock.title,
      description: skillPageMock.description,
      skills: skillPageMock.skills,
      last_jobs: skillPageMock.lastJobs
    })
    const result = await repository.getSkillsPage()
    const expected = skillPageMock

    expect(mockedFn).toHaveBeenCalledTimes(1)
    expect(mockedFn).toHaveBeenCalledWith('select * from skills_page;')
    expect(result).toEqual(expected)
  });

  test("UPDATE Method", async () => {
    const mockedFn = vi.spyOn(db, 'none')
    const fieldsWithValues = getFieldsWithValues<SkillsPage>(skillPageMock)

    await expect(repository.updateSkillsPage(skillPageMock)).resolves.not.toThrow()
    expect(mockedFn).toHaveBeenCalledTimes(1)
    expect(mockedFn).toHaveBeenCalledWith(
      'update skills_page set $1:raw;',
      [fieldsWithValues].toString()
    )
  });

  test("DELETE Method", async () => {
    const mockedFn = vi.spyOn(db, 'none')

    await expect(repository.deleteSkillsPage()).resolves.not.toThrow()
    expect(mockedFn).toHaveBeenCalledTimes(1)
    expect(mockedFn).toHaveBeenCalledWith(
      'delete from skills_page;'
    )
  });
});
