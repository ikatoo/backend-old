import { SkillsPageRepository } from "@/infra/db";
import { app } from "@/infra/http/express/server";
import skillPageMock from "@shared/mocks/skillsPageMock/result.json";
import request from "supertest";
import { afterEach, describe, expect, test } from "vitest";

describe("EXPRESS: /skills routes", () => {
  const repository = new SkillsPageRepository();

  afterEach(async () => {
    await repository.clear()
  });

  test("PUT Method: responds with 405 code when try use put method", async () => {
    const { statusCode } = await request(app)
      .put("/skills")
      .send()

    expect(statusCode).toEqual(405);
  })

  test("GET Method: result is equal the mock with 200 statusCode", async () => {
    await repository.createSkillsPage(skillPageMock);
    const { body, statusCode } = await request(app)
      .get("/skills")
      .send()

    expect(body).toEqual(skillPageMock);
    expect(statusCode).toBe(200);
  });

  test("GET Method: responds with 204 when there is no data to return", async () => {
    const { body, statusCode } = await request(app)
      .get("/skills")
      .send()

    expect(statusCode).toBe(204);
    expect(body).toEqual({});
  });

  test("POST Method: create skills page with 204 statusCode", async () => {
    const { statusCode } = await request(app)
      .post("/skills")
      .send(skillPageMock)
    const page = await repository.getSkillsPage()

    expect(statusCode).toBe(201);
    expect(page).toEqual(skillPageMock)
  });

  test("POST Method: responds with 409 when try create page with existent data", async () => {
    await repository.createSkillsPage(skillPageMock);
    const { statusCode } = await request(app)
      .post("/skills")
      .send(skillPageMock)

    expect(statusCode).toBe(409);
  })

  test("POST Method: responds with 400 when request without payload", async () => {
    const { statusCode } = await request(app)
      .post("/skills")
      .send()

    expect(statusCode).toBe(400);
  })

  test("PATCH Method: responds with 204 when update", async () => {
    const { statusCode } = await request(app)
      .patch("/skills")
      .send({ title: 'new title' })

    expect(statusCode).toBe(204);
  });

  test("PATCH Method: responds with 409 when try update with invalid payload", async () => {
    await repository.createSkillsPage(skillPageMock);
    const { statusCode } = await request(app)
      .patch("/skills")
      .send({ invalid: 'payload' })

    expect(statusCode).toBe(409);
  });

  test("PATCH Method: responds with 400 when try update without payload", async () => {
    const { statusCode } = await request(app)
      .patch("/skills")
      .send()

    expect(statusCode).toBe(400);
  });;

  test("DELETE Method: responde with status 204", async () => {
    await repository.createSkillsPage(skillPageMock);
    const { statusCode } = await request(app)
      .delete("/skills")
      .send()
    const actual = await repository.getSkillsPage()

    expect(statusCode).toBe(204)
    expect(actual).toBeUndefined()
  })

});
