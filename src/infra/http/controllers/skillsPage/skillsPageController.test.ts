import { SkillsPageRepository } from "@/infra/db";
import skillPageMock from "@/mock/skillPageMock";
import { afterEach, describe, expect, test } from "vitest";
import { getSkillsPageHandler } from "./skillsPageController";

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
});
