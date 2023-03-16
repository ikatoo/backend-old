import { describe, expect, test } from "vitest";
import { aboutPageHandler } from "./aboutPageController";
import { aboutPageMock } from "@/mock/aboutPageMock";

describe("AboutPage Controller test", () => {
  test("Get about page data", () => {
    const result = aboutPageHandler();
    const expected = aboutPageMock;

    expect(expected).toBe(result);
  });
});
