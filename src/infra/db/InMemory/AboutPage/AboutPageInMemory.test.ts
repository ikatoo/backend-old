import aboutPageMock from "@/mock/aboutPageMock";
import { describe, expect, test } from "vitest";
import AboutPageInMemory from "./AboutPageInMemory";

describe("Basic operations in AboutPage InMemory Database", () => {
  const repository = new AboutPageInMemory();

  test("CREATE and READ Method", async () => {
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
    const expected = { ...aboutPageMock, ...newValue };
    const actual = await repository.getAboutPage();
    
    expect(expected).toEqual(actual);
  });

  test("DELETE Method", async () => {
    await repository.deleteAboutPage()
    const expected = undefined;
    const actual = await repository.getAboutPage();
    
    expect(expected).toEqual(actual);
  });
});
