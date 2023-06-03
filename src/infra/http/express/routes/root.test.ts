
import request from "supertest";
import { describe, expect, test } from "vitest";
import { app } from "../server";

describe("GET /", () => {
  test("responds with 200", async () => {
    const { statusCode } = await request(app)
      .get('/')
      .send()

    expect(statusCode).toBe(200);
  });

  test("version is 0.0.1", async () => {
    const { body } = await request(app)
      .get('/')
      .send()

    const expected = { version: "0.0.1" };

    expect(body).toEqual(expected);
  });
});
