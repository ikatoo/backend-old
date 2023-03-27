import { AboutPageRepository } from "@/infra/db";
import { SkillsRepository } from "@/infra/db";
import aboutPageMock from "@/mock/aboutPageMock";
import { describe, expect, test } from "vitest";
import { getAboutPageHandler } from "./aboutPageController";

describe("AboutPage Controller test", () => {
  test("Get about page data", async () => {
    const aboutPageRepository = new AboutPageRepository();
    const skillsRepository = new SkillsRepository();

    await aboutPageRepository.createAboutPage(aboutPageMock);
    const { id } = await aboutPageRepository.getAboutPage()
    for (const skill of aboutPageMock.skills) {
      await skillsRepository.createSkill({ ...skill, aboutPageId: id })
    }

    const result = await getAboutPageHandler();
    const expected = { id: result.id, ...aboutPageMock };

    expect(expected).toEqual(result);
  });
});
