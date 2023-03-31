import { SkillsPageRepository } from "@/infra/db";
import skillPageMock from "@/mock/skillPageMock";
import { afterEach, describe, expect, test } from "vitest";
import { createSkillsPageHandler, getSkillsPageHandler, upadteSkillsPageHandler } from "./skillsPageController";

describe("SkillsPage Controller test", () => {
  const skillsPageRepository = new SkillsPageRepository()

  afterEach(async () => {
    await skillsPageRepository.clear()
  })

  test("Get skills page data", async () => {
    await skillsPageRepository.createSkillsPage(skillPageMock);
    const result = await getSkillsPageHandler();

    expect(skillPageMock).toEqual(result);
  });

  test("Create skills page data without error", async () => {
    await expect(createSkillsPageHandler(skillPageMock))
      .resolves.not.toThrow()
    const page = await skillsPageRepository.getSkillsPage()

    expect(page).toEqual(skillPageMock)
  });

  test("Update skills page data without error", async () => {
    await skillsPageRepository.createSkillsPage(skillPageMock);
    const newData = {
      title: 'new title',
      description: 'new Description'
    }
    await expect(upadteSkillsPageHandler(newData))
      .resolves.not.toThrow()
    const page = await skillsPageRepository.getSkillsPage()

    expect(page).toEqual({ ...skillPageMock, ...newData })
  });
});
