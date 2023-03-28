import { AboutPageRepository } from "@/infra/db";
import aboutPageMock from "@/mock/aboutPageMock";
import { describe, expect, test } from "vitest";
import { getAboutPageHandler } from "./aboutPageController";

describe("AboutPage Controller test", () => {
  test("Get about page data", async () => {
    const aboutPageRepository = new AboutPageRepository();
    await aboutPageRepository.createAboutPage(aboutPageMock);
    const result = await getAboutPageHandler();

    expect(aboutPageMock).toEqual(result);
  });
});
