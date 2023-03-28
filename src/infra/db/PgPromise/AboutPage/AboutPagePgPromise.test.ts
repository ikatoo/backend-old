import aboutPageMock from "@/mock/aboutPageMock";
import { afterEach, beforeAll, describe, expect, test } from "vitest";
import AboutPagePgPromise from "./AboutPagePgPromise";
import db from "..";

describe("Basic operations in AboutPage Postgres Database", () => {
  const repository = new AboutPagePgPromise();

  afterEach(async () => {
    await db.none('delete from about_page;')
  })

  test("CREATE Method", async () => {
    await expect(repository.createAboutPage(aboutPageMock))
      .resolves.not.toThrow()
  });

  test("READ Method", async () => {
    await repository.createAboutPage(aboutPageMock);
    const actual = await repository.getAboutPage();

    expect(aboutPageMock).toEqual(actual);
  });

  test("UPDATE Method", async () => {
    await repository.createAboutPage(aboutPageMock);
    const newValue = {
      description: "new description",
    };
    await repository.updateAboutPage(newValue);
    const actual = await repository.getAboutPage();
    const expected = { ...aboutPageMock, ...newValue };

    expect(expected).toEqual(actual);
  });

  test("DELETE Method", async () => {
    await repository.createAboutPage(aboutPageMock);
    await repository.deleteAboutPage()
    const expected = undefined;
    const actual = await repository.getAboutPage();

    expect(expected).toEqual(actual);
  });
});
