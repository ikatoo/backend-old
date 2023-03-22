import { AboutPageRepository } from "@/infra/db/AboutPage";
import aboutPageMock from "@/mock/aboutPageMock";
import { describe, expect, test } from "vitest";
import { getAboutPageHandler } from "./aboutPageController";

describe("AboutPage Controller test", () => {
  test("Get about page data", async () => {
    const repository = new AboutPageRepository();
    await repository.createAboutPage(aboutPageMock);

    const result = await getAboutPageHandler();
    const expected = aboutPageMock;

    expect(expected).toBe(result);
  });
});
