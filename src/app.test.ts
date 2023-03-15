// import assert from "node:assert";
// import test, { after, before, describe } from "node:test";
import { afterAll, beforeAll, describe, expect, test } from "vitest";
import { env } from "./env";

describe("App test", () => {
  beforeAll(() => {
    console.log("before init test suit");
  });

  afterAll(() => {
    console.log("After end test suit");
  });

  test("should get PORT value", () => {
    expect(env.PORT).toBe(8000);
  });
});
