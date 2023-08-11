import { AboutPageRepository } from "@/infra/db";
import aboutPageMock from "@shared/mocks/aboutPageMock/result.json";
import { afterEach, describe, expect, test, vi } from "vitest";
import { createAboutPageHandler, deleteAboutPageHandler, getAboutPageHandler, updateAboutPageHandler } from "./aboutPageController";

describe("AboutPage Controller test", () => {
  afterEach(() => {
    vi.clearAllMocks()
    vi.restoreAllMocks()
  })

  test("Get about page data", async () => {
    const spy = vi.spyOn(AboutPageRepository.prototype, 'getAboutPage').mockResolvedValueOnce(aboutPageMock)
    const { body } = await getAboutPageHandler();

    expect(aboutPageMock).toEqual(body);
    expect(spy).toHaveBeenCalledTimes(1)
  });

  test("Create about page without error", async () => {
    const spy = vi.spyOn(AboutPageRepository.prototype, 'createAboutPage').mockResolvedValueOnce()

    await expect(createAboutPageHandler({ parameters: aboutPageMock }))
      .resolves.not.toThrow()
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith(aboutPageMock)
  });

  test("Update about page without error", async () => {
    const mockedData = { title: 'new title' }
    const spy = vi.spyOn(AboutPageRepository.prototype, 'updateAboutPage').mockResolvedValueOnce()

    await expect(updateAboutPageHandler({ parameters: mockedData }))
      .resolves.not.toThrow()
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith(mockedData)
  });

  test("Delete about page", async () => {
    const spy = vi.spyOn(AboutPageRepository.prototype, 'deleteAboutPage').mockResolvedValueOnce()
    
    await expect(deleteAboutPageHandler())
      .resolves.not.toThrow()
    expect(spy).toHaveBeenCalledTimes(1)
  });
});
