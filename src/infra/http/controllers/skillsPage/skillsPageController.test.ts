import { SkillsPageRepository } from "@/infra/db";
import skillPageMock from "@/mock/skillPageMock";
import { afterEach, describe, expect, test } from "vitest";
import { createSkillsPageHandler, deleteSkillsPageHandler, getSkillsPageHandler, updateSkillsPageHandler } from "./skillsPageController";

describe("SkillsPage Controller test", () => {
  const skillsPageRepository = new SkillsPageRepository()

  afterEach(async () => {
    await skillsPageRepository.clear()
  })

  test("Get skills page data", async () => {
    await skillsPageRepository.createSkillsPage(skillPageMock);
    const { body, statusCode } = await getSkillsPageHandler();

    expect(body).toEqual(skillPageMock);
    expect(statusCode).toEqual(200);
  });

  test("Create skills page data without error", async () => {
    await expect(createSkillsPageHandler({ parameters: skillPageMock }))
      .resolves.not.toThrow()
    const page = await skillsPageRepository.getSkillsPage()

    expect(page).toEqual(skillPageMock)
  });

  test("Update skills page data with 204 status code", async () => {
    await skillsPageRepository.createSkillsPage(skillPageMock);
    const newData = {
      title: 'new title',
      description: 'new Description'
    }
    const { statusCode } = await updateSkillsPageHandler({ parameters: newData })
    const page = await skillsPageRepository.getSkillsPage()

    expect(statusCode).toEqual(204)
    expect(page).toEqual({ ...skillPageMock, ...newData })
  });

  test("Delete skills page data with 204 status code", async () => {
    await skillsPageRepository.createSkillsPage(skillPageMock);
    const { statusCode } = await deleteSkillsPageHandler()
    const page = await skillsPageRepository.getSkillsPage()

    expect(statusCode).toEqual(204)
    expect(page).toBeUndefined()
  });
});
