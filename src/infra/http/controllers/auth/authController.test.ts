import { UsersRepository } from "@/infra/db/PgPromise/Users";
import { env } from "@/utils/env";
import * as cryptoUtils from "@/utils/hasher";
import jwt, { sign } from "jsonwebtoken";
import { afterEach, describe, expect, test, vi } from "vitest";
import { authentication, verifyToken } from "./authController";

describe("Auth Controller test", () => {
  const mock = {
    id: 1,
    name: 'test name1',
    email: 'teste1@email.com',
    password: 'pass'
  }

  afterEach(() => {
    vi.clearAllMocks()
    vi.restoreAllMocks()
  })

  describe('authentication', () => {
    test("Auth user with success", async () => {
      vi.spyOn(UsersRepository.prototype, 'getUserByEmail')
        .mockResolvedValueOnce(mock)
      vi.spyOn(cryptoUtils, 'compareHash').mockResolvedValueOnce(true)
      vi.spyOn(jwt, 'sign').mockImplementation(() => ('valid-access-token'))

      const result = await authentication({
        parameters: { email: mock.email, password: mock.password }
      })

      expect(result?.statusCode).toEqual(200)
      expect(result?.body).toHaveProperty('accessToken', 'valid-access-token')
    });

    test("Fail on try auth user with invalid parameters", async () => {
      await expect(authentication({
        parameters: { invalid: 'parameter' }
      })).rejects.toThrowError('Invalid parameters')
    })

    test("Fail on try auth user with invalid email", async () => {
      vi.spyOn(UsersRepository.prototype, 'getUserByEmail')
        .mockResolvedValueOnce(undefined)

      await expect(authentication({
        parameters: { email: 'invalid@email.com', password: 'somepass' }
      })).rejects.toThrowError('Unauthorized')
    })

    test("Fail on try auth user with invalid password", async () => {
      vi.spyOn(UsersRepository.prototype, 'getUserByEmail')
        .mockResolvedValueOnce(mock)
      vi.spyOn(cryptoUtils, 'compareHash').mockResolvedValueOnce(false)

      await expect(authentication({
        parameters: { email: mock.email, password: 'invalidpass' }
      })).rejects.toThrowError('Unauthorized')
    })

    test("Fail on try auth user when database access is fail", async () => {
      vi.spyOn(UsersRepository.prototype, 'getUserByEmail')
        .mockImplementationOnce(() => {
          throw new Error();
        })

      await expect(authentication({
        parameters: { email: mock.email, password: mock.password }
      })).rejects.toThrowError()
    })
  })

  describe('verifyToken', () => {
    test('should fail on not send parameters', async () => {
      await expect(verifyToken())
        .rejects.toThrowError('Unauthorized')
    })

    test('should fail on use invalid parameters', async () => {
      await expect(verifyToken({ parameters: { invalid: 'parameter' } }))
        .rejects.toThrowError('Unauthorized')
    })

    test('should fail on use a empty token', async () => {
      await expect(verifyToken({ parameters: { token: '' } }))
        .rejects.toThrowError('Unauthorized')
    })

    test('should fail on use invalid token', async () => {
      await expect(verifyToken({ parameters: { token: 'invalid-token' } }))
        .rejects.toThrowError('Unauthorized')
    })

    test('should fail on use invalid id', async () => {
      const accessToken = sign(
        { id: 7 },
        env.JWT_SECRET,
        { expiresIn: '1h' }
      )
      await expect(verifyToken({
        parameters: {
          token: accessToken
        }
      })).rejects.toThrowError('Unauthorized')
    })

    test('should return statusCode 200 on use a valid token', async () => {
      vi.spyOn(UsersRepository.prototype, 'getUserByID')
        .mockResolvedValueOnce(mock)

      const accessToken = sign(
        { id: mock.id },
        env.JWT_SECRET,
        { expiresIn: '1h' }
      )
      const result = await verifyToken({
        parameters: {
          token: accessToken
        }
      })

      expect(result?.statusCode).toEqual(200)
    })

    test('shold fail on use a expired token', async () => {
      vi.spyOn(UsersRepository.prototype, 'getUserByID')
        .mockResolvedValueOnce(mock)
      const accessToken = sign(
        { id: mock.id },
        env.JWT_SECRET,
        { expiresIn: '1h' }
      )
      vi.useFakeTimers()
      setTimeout(async () => {
        vi.fn()
      }, 1000 * 60 * 60);
      vi.advanceTimersToNextTimer()

      await expect(verifyToken({
        parameters: {
          token: accessToken
        }
      })).rejects.toThrowError('Unauthorized')
    })
  })
});
