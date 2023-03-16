import aboutPageMock from "@/mock/aboutPageMock";
import { describe, expect, test } from "vitest";
import { aboutPageHandler } from "./aboutPageController";

describe("AboutPage Controller test", () => {
  test("Get about page data", () => {
    const result = aboutPageHandler();
    const expected = aboutPageMock;

    expect(expected).toBe(result);
  });
});
