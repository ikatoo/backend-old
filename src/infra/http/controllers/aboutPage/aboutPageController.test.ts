import { AboutPageRepository } from "@/infra/db";
import aboutPageMock from "@/mock/aboutPageMock";
import { afterEach, describe, expect, test } from "vitest";
import { createAboutPageHandler, deleteAboutPageHandler, getAboutPageHandler, updateAboutPageHandler } from "./aboutPageController";

describe("AboutPage Controller test", () => {
  const aboutPageRepository = new AboutPageRepository();

  afterEach(async () => {
    await aboutPageRepository.clear()
  })

  test("Get about page data", async () => {
    await aboutPageRepository.createAboutPage(aboutPageMock);
    const { body } = await getAboutPageHandler();

    expect(aboutPageMock).toEqual(body);
  });

  test("Create about page without error", async () => {
    await expect(createAboutPageHandler({ page: aboutPageMock }))
      .resolves.not.toThrow()
    const page = await aboutPageRepository.getAboutPage()

    expect(page).toEqual(aboutPageMock)
  });

  test("Update about page without error", async () => {
    await aboutPageRepository.createAboutPage(aboutPageMock);
    await expect(updateAboutPageHandler({page: { title: 'new title' }}))
      .resolves.not.toThrow()
  });

  test("Delete about page", async () => {
    await aboutPageRepository.createAboutPage(aboutPageMock);
    await deleteAboutPageHandler()
    const actual = await aboutPageRepository.getAboutPage()

    expect(actual).toBeUndefined()
  });
});
