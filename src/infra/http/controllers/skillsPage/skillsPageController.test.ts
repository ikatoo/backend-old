import { SkillsPageRepository } from "@/infra/db";
import skillPageMock from "@shared/mocks/skillsPageMock/result.json";
import { afterEach, describe, expect, test, vi } from "vitest";
import { createSkillsPageHandler, deleteSkillsPageHandler, getSkillsPageHandler, updateSkillsPageHandler } from "./skillsPageController";

describe("SkillsPage Controller test", () => {
  afterEach(async () => {
    vi.clearAllMocks()
    vi.restoreAllMocks()
  })

  test("Get skills page data", async () => {
    const spy = vi.spyOn(SkillsPageRepository.prototype, 'getSkillsPage')
      .mockResolvedValueOnce(skillPageMock)
    const result = await getSkillsPageHandler();

    expect(result?.body).toEqual(skillPageMock);
    expect(result?.statusCode).toEqual(200);
    expect(spy).toHaveBeenCalledTimes(1)
  });

  test("Create skills page data without error", async () => {
    const spy = vi.spyOn(SkillsPageRepository.prototype, 'createSkillsPage')
      .mockResolvedValueOnce()

    await expect(createSkillsPageHandler({ parameters: { data: skillPageMock } }))
      .resolves.not.toThrow()
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith(skillPageMock)
  });

  test("Update skills page data with 204 status code", async () => {
    const spy = vi.spyOn(SkillsPageRepository.prototype, 'updateSkillsPage')
      .mockResolvedValueOnce()
    const mockedData = {
      title: 'new title',
      description: 'new Description'
    }

    await expect(updateSkillsPageHandler({ parameters: { data: mockedData } }))
      .resolves.toEqual({ statusCode: 204 })
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith(mockedData)
  });

  test("Delete skills page data with 204 status code", async () => {
    const spy = vi.spyOn(SkillsPageRepository.prototype, 'deleteSkillsPage')
      .mockResolvedValueOnce()

    await expect(deleteSkillsPageHandler())
      .resolves.toEqual({ statusCode: 204 })
    expect(spy).toHaveBeenCalledTimes(1)
  });
});
