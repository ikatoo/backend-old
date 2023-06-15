import aboutPageMock from "@shared/mocks/aboutPageMock/result.json";
import { describe, expect, test } from "vitest";
import AboutPageInMemory from "./AboutPageInMemory";

describe("Basic operations in AboutPage InMemory Database", () => {
  const repository = new AboutPageInMemory();

  test("CREATE Method", async () => {
    await expect(repository.createAboutPage(aboutPageMock))
      .resolves.not.toThrow()
  });

  test("READ Method", async () => {
    await repository.createAboutPage(aboutPageMock);
    const expected = aboutPageMock;
    const actual = await repository.getAboutPage();

    expect(expected).toEqual(actual);
  });

  test("UPDATE Method", async () => {
    const newValue = {
      description: "new description",
    };
    await repository.updateAboutPage(newValue);
    const actual = await repository.getAboutPage();
    const expected = { ...aboutPageMock, ...newValue };

    expect(expected).toEqual(actual);
  });

  test("DELETE Method", async () => {
    await repository.deleteAboutPage()
    const expected = undefined;
    const actual = await repository.getAboutPage();

    expect(expected).toEqual(actual);
  });
});
