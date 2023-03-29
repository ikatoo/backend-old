import { AboutPageRepository } from "@/infra/db";
import db from "@/infra/db/PgPromise";
import aboutPageMock from "@/mock/aboutPageMock";
import { afterEach, describe, expect, test } from "vitest";
import { createAboutPageHandler, getAboutPageHandler } from "./aboutPageController";

describe("AboutPage Controller test", () => {
  const aboutPageRepository = new AboutPageRepository();

  afterEach(async () => {
    await db.none('delete from about_page;')
  })

  test("Get about page data", async () => {
    await aboutPageRepository.createAboutPage(aboutPageMock);
    const result = await getAboutPageHandler();

    expect(aboutPageMock).toEqual(result);
  });

  test("Create about page without error", async () => {
    await expect(createAboutPageHandler(aboutPageMock))
      .resolves.not.toThrow()
  });
});
