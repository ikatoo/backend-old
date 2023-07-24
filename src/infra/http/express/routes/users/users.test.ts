import { UsersRepository } from "@/infra/db/PgPromise/Users";
import { app } from "@/infra/http/express/server";
import { User } from "@/repository/IUser";
import request from "supertest";
import { afterEach, describe, expect, test } from "vitest";

describe("EXPRESS: /users routes", () => {
  const userRepository = new UsersRepository()
  const usersMock: User[] = [
    {
      name: 'user test1',
      email: 'email@test1.com',
      password: 'pass1'
    },
    {
      name: 'user test2',
      email: 'email@test2.com',
      password: 'pass2'
    },
  ]

  afterEach(async () => {
    await userRepository.clear()
  });

  test("PUT Method: responds with 405 code when try use put method", async () => {
    const { statusCode } = await request(app)
      .put("/user")
      .send()

    expect(statusCode).toEqual(405);
  })

  test("GET Method: list all users with 200 statusCode", async () => {
    usersMock.forEach(async user => {
      await userRepository.createUser(user)
    })
    while ((await userRepository.listUsers()).length < usersMock.length) { }
    const { body, statusCode } = await request(app)
      .get("/users")
      .send()
    const expected = (body as User[]).map(user => ({
      name: user.name,
      email: user.email,
      password: user.password
    }))

    expect(expected).toEqual(usersMock);
    expect(statusCode).toBe(200);
  });

  test("GET Method: get user by email with 200 statusCode", async () => {
    const expected = usersMock[0]
    usersMock.forEach(async user => {
      await userRepository.createUser(user)
    })
    while ((await userRepository.listUsers()).length < usersMock.length) { }

    const { body, statusCode } = await request(app)
      .get(`/user/email/${expected.email}`)
      .send()

    const { id, ...result } = (body as User)

    expect(result).toEqual(expected);
    expect(statusCode).toBe(200);
  });

  test("GET Method: find users by partial name with 200 statusCode", async () => {
    const expected = [usersMock[0]]
    usersMock.forEach(async user => {
      await userRepository.createUser(user)
    })
    while ((await userRepository.listUsers()).length < usersMock.length) { }

    const { body, statusCode } = await request(app)
      .get('/users/name/1')
      .send()

    const result = (body as User[]).map(user => {
      const { id, ...rest } = user
      return rest
    })

    expect(result).toEqual(expected);
    expect(statusCode).toBe(200);
  });

  test("GET Method: responds with 204 when there is no data to return", async () => {
    const { body, statusCode } = await request(app)
      .get("/users")
      .send()

    expect(statusCode).toBe(204);
    expect(body).toEqual({});
  });

  // test("POST Method: create skills page with 204 statusCode", async () => {
  //   const { statusCode } = await request(app)
  //     .post("/users")
  //     .send(skillPageMock)
  //   const page = await repository.getSkillsPage()

  //   expect(statusCode).toBe(201);
  //   expect(page).toEqual(skillPageMock)
  // });

  // test("POST Method: responds with 409 when try create page with existent data", async () => {
  //   await repository.createUser(skillPageMock);
  //   const { statusCode } = await request(app)
  //     .post("/users")
  //     .send(skillPageMock)

  //   expect(statusCode).toBe(409);
  // })

  // test("POST Method: responds with 400 when request without payload", async () => {
  //   const { statusCode } = await request(app)
  //     .post("/users")
  //     .send()

  //   expect(statusCode).toBe(400);
  // })

  // test("PATCH Method: responds with 204 when update", async () => {
  //   const { statusCode } = await request(app)
  //     .patch("/users")
  //     .send({ title: 'new title' })

  //   expect(statusCode).toBe(204);
  // });

  // test("PATCH Method: responds with 409 when try update with invalid payload", async () => {
  //   await repository.createUser(skillPageMock);
  //   const { statusCode } = await request(app)
  //     .patch("/users")
  //     .send({ invalid: 'payload' })

  //   expect(statusCode).toBe(409);
  // });

  // test("PATCH Method: responds with 400 when try update without payload", async () => {
  //   const { statusCode } = await request(app)
  //     .patch("/users")
  //     .send()

  //   expect(statusCode).toBe(400);
  // });

  // test("DELETE Method: responde with status 204", async () => {
  //   await repository.createUser(skillPageMock);
  //   const { statusCode } = await request(app)
  //     .delete("/users")
  //     .send()
  //   const actual = await repository.getSkillsPage()

  //   expect(statusCode).toBe(204)
  //   expect(actual).toBeUndefined()
  // });

});