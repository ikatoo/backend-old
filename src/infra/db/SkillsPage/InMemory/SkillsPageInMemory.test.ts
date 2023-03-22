import skillPageMock from "@/mock/skillPageMock";
import { describe, expect, test } from "vitest";
import SkillsPageInMemory from "./SkillsPageInMemory";

describe("Basic operations in SkillsPage InMemory Database", () => {
  const repository = new SkillsPageInMemory();

  test("CREATE and READ Method", async () => {
    await repository.createSkillsPage(skillPageMock);
    const actual = await repository.getSkillsPage();
    const expected = { id: actual.id, ...skillPageMock };

    expect(expected).toEqual(actual);
  });

  test("UPDATE Method", async () => {
    const newValue = {
      description: "new description",
    };
    await repository.updateSkillsPage(newValue);
    const actual = await repository.getSkillsPage();
    const expected = { id: actual.id, ...skillPageMock, ...newValue };

    expect(expected).toEqual(actual);
  });

  test("DELETE Method", async () => {
    await repository.deleteSkillsPage();
    const expected = undefined;
    const actual = await repository.getSkillsPage();

    expect(expected).toEqual(actual);
  });
});
