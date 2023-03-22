import aboutPageMock from "@/mock/aboutPageMock";
import { afterEach, describe, expect, test } from "vitest";
import AboutPagePgPromise from "./AboutPagePgPromise";
import db from "./db";

describe("Basic operations in AboutPage Postgres Database", () => {
  const repository = new AboutPagePgPromise();
  const { skills, ...rest } = aboutPageMock

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
    const expected = { id: actual.id, ...rest };

    expect(expected).toEqual(actual);
  });

  test("UPDATE Method", async () => {
    await repository.createAboutPage(aboutPageMock);
    const newValue = {
      description: "new description",
    };
    await repository.updateAboutPage(newValue);
    const { skills, ...actual } = await repository.getAboutPage();
    const expected = {
      id: actual.id,
      title: aboutPageMock.title,
      description: newValue.description,
      illustrationALT: aboutPageMock.illustrationALT,
      illustrationURL: aboutPageMock.illustrationURL
    };

    expect(expected).toEqual(actual);
  });

  test("DELETE Method", async () => {
    await repository.createAboutPage(aboutPageMock);
    await repository.deleteAboutPage()
    const expected = {};
    const actual = await repository.getAboutPage();

    expect(expected).toEqual(actual);
  });
});
