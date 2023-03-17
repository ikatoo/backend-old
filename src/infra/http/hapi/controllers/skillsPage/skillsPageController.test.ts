import { SkillsPageRepository } from "@/infra/db";
import skillPageMock from "@/mock/skillPageMock";
import { describe, expect, test } from "vitest";
import { getSkillsPageHandler } from "./skillsPageController";

describe("SkillsPage Controller test", () => {
  test("Get skills page data", async () => {
    const repository = new SkillsPageRepository();
    await repository.createSkillsPage(skillPageMock);

    const result = await getSkillsPageHandler();
    const expected = skillPageMock;

    expect(expected).toBe(result);
  });
});
