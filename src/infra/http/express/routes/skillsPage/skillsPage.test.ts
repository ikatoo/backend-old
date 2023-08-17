import { SkillsPageRepository } from "@/infra/db";
import * as AuthController from '@/infra/http/controllers/auth/authController';
import { app } from "@/infra/http/express/server";
import skillPageMock from "@shared/mocks/skillsPageMock/result.json";
import request from "supertest";
import { afterEach, describe, expect, test, vi } from "vitest";

describe("EXPRESS: /skills routes", () => {
  afterEach(async () => {
    vi.clearAllMocks()
    vi.restoreAllMocks()
  });

  test("PUT Method: response with 405 code when try use put method", async () => {
    const { statusCode } = await request(app)
      .put("/skills")
      .send()

    expect(statusCode).toEqual(405);
  })

  test("GET Method: result is equal the mock with 200 statusCode", async () => {
    const spy = vi.spyOn(SkillsPageRepository.prototype, 'getSkillsPage')
      .mockResolvedValueOnce(skillPageMock)

    const { body, statusCode } = await request(app)
      .get("/skills")
      .send()

    expect(body).toEqual(skillPageMock);
    expect(statusCode).toBe(200);
    expect(spy).toHaveBeenCalledTimes(1)
  });

  test("GET Method: response with 204 when there is no data to return", async () => {
    const spy = vi.spyOn(SkillsPageRepository.prototype, 'getSkillsPage')
      .mockResolvedValueOnce(undefined)

    const { body, statusCode } = await request(app)
      .get("/skills")
      .send()

    expect(statusCode).toBe(204);
    expect(body).toEqual({});
    expect(spy).toHaveBeenCalledTimes(1)
  });

  test("POST Method: should expect 401 statusCode when without token", async () => {
    const { statusCode, body } = await request(app)
      .post("/skills")
      .send(skillPageMock)

    expect(statusCode).toBe(401);
    expect(body.message).toBe('Unauthorized');
  });

  test("POST Method: create skills page with 204 statusCode", async () => {
    vi.spyOn(AuthController, 'verifyToken').mockResolvedValueOnce()
    const spy = vi.spyOn(SkillsPageRepository.prototype, 'createSkillsPage')
      .mockResolvedValueOnce()

    const { statusCode } = await request(app)
      .post("/skills")
      .send(skillPageMock)

    expect(statusCode).toBe(201);
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith(skillPageMock)
  });

  test("POST Method: response with 409 when try create page with existent data", async () => {
    vi.spyOn(AuthController, 'verifyToken').mockResolvedValueOnce()
    const spy = vi.spyOn(SkillsPageRepository.prototype, 'createSkillsPage')
      .mockImplementationOnce(() => { throw new Error() })

    const { statusCode } = await request(app)
      .post("/skills")
      .send(skillPageMock)

    expect(statusCode).toBe(409);
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith(skillPageMock)
  })

  test("POST Method: response with 400 when request without payload", async () => {
    vi.spyOn(AuthController, 'verifyToken').mockResolvedValueOnce()
    const { statusCode } = await request(app)
      .post("/skills")
      .send()

    expect(statusCode).toBe(400);
  })

  test("PATCH Method: should expect 401 statusCode when without token", async () => {
    const mockedData = { title: 'new title' }

    const { statusCode, body } = await request(app)
      .patch("/skills")
      .send(mockedData)

    expect(statusCode).toBe(401);
    expect(body.message).toBe('Unauthorized');
  });

  test("PATCH Method: response with 204 when update", async () => {
    vi.spyOn(AuthController, 'verifyToken').mockResolvedValueOnce()
    const mockedData = { title: 'new title' }
    const spy = vi.spyOn(SkillsPageRepository.prototype, 'updateSkillsPage')
      .mockResolvedValueOnce()

    const { statusCode } = await request(app)
      .patch("/skills")
      .send(mockedData)

    expect(statusCode).toBe(204);
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith(mockedData)
  });

  test("PATCH Method: response with 409 when try update with invalid payload", async () => {
    vi.spyOn(AuthController, 'verifyToken').mockResolvedValueOnce()
    const { statusCode } = await request(app)
      .patch("/skills")
      .send({ invalid: 'payload' })

    expect(statusCode).toBe(409);
  });

  test("PATCH Method: response with 400 when try update without payload", async () => {
    vi.spyOn(AuthController, 'verifyToken').mockResolvedValueOnce()
    const { statusCode } = await request(app)
      .patch("/skills")
      .send()

    expect(statusCode).toBe(400);
  });

  test("DELETE Method: should expect 401 statusCode when without token", async () => {
    const { statusCode, body } = await request(app)
      .delete("/skills")
      .send()

    expect(statusCode).toBe(401)
    expect(body.message).toBe('Unauthorized')
  });

  test("DELETE Method: responde with status 204", async () => {
    vi.spyOn(AuthController, 'verifyToken').mockResolvedValueOnce()
    const spy = vi.spyOn(SkillsPageRepository.prototype, 'deleteSkillsPage')
      .mockResolvedValueOnce()

    const { statusCode } = await request(app)
      .delete("/skills")
      .send()

    expect(statusCode).toBe(204)
    expect(spy).toHaveBeenCalledTimes(1)
  });

});
