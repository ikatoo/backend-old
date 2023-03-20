import aboutPageMock from "@/mock/aboutPageMock";
import { afterEach, describe, expect, test } from "vitest";
import db from "../db";
import AboutPagePgPromise from "./AboutPagePgPromise";

describe("Basic operations in AboutPage Postgres Database", () => {
  const repository = new AboutPagePgPromise();

  afterEach(async () => {
    await db.none('delete * from about_page;')
  })

  test("CREATE and READ Method", async () => {
    await repository.createAboutPage(aboutPageMock);
    const expected = aboutPageMock;
    const actual = await repository.getAboutPage();

    expect(expected).toEqual(actual);
  });

  // test("UPDATE Method", async () => {
  //   const newValue = {
  //     description: "new description",
  //   };
  //   await repository.updateAboutPage(newValue);
  //   const expected = { ...aboutPageMock, ...newValue };
  //   const actual = await repository.getAboutPage();

  //   expect(expected).toEqual(actual);
  // });

  // test("DELETE Method", async () => {
  //   await repository.deleteAboutPage()
  //   const expected = undefined;
  //   const actual = await repository.getAboutPage();

  //   expect(expected).toEqual(actual);
  // });
});
