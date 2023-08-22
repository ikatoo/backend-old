vi.mock('../..')

import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import TokenBlacklistPgPromise from ".";
import db from "../..";

describe("Basic operations in Users Repository", () => {
  const blacklist = new TokenBlacklistPgPromise()

  afterEach(() => {
    vi.restoreAllMocks()
    vi.clearAllMocks()
  })

  beforeEach(() => {
    db.none('delete from users;')
  })

  test("should add token to blacklist", async () => {
    const mockedFn = vi.spyOn(db, 'none')
    const token = 'valid-token'

    await expect(blacklist.add(token)).resolves.not.toThrow()
    expect(mockedFn).toHaveBeenCalledTimes(1)
    expect(mockedFn).toHaveBeenCalledWith(
      'insert into token_blacklist (code) values ($1)',
      [token]
    )
  });

  test('should remove token to blacklist', async () => {
    const mockedFn = vi.spyOn(db, 'none')
    const token = 'valid-token'

    await expect(blacklist.remove(token)).resolves.not.toThrow()
    expect(mockedFn).toHaveBeenCalledTimes(1)
    expect(mockedFn).toHaveBeenCalledWith(
      'delete from token_blacklist where code=$1',
      [token]
    )
  })

  test('should return true when verify a existent token in blacklist', async () => {
    const token = 'valid-token'
    const mockedFn = vi.spyOn(db, 'oneOrNone').mockResolvedValueOnce({ id: 7, code: token })

    await expect(blacklist.isBlacklisted(token)).resolves.toEqual(true)
    expect(mockedFn).toHaveBeenCalledTimes(1)
    expect(mockedFn).toHaveBeenCalledWith(
      'select * from token_blacklist where code=$1',
      [token]
    )
  })

  test('should return false when token is not in the blacklist', async () => {
    const token = 'valid-token'
    const mockedFn = vi.spyOn(db, 'oneOrNone').mockResolvedValueOnce(null)

    await expect(blacklist.isBlacklisted(token)).resolves.toEqual(false)
    expect(mockedFn).toHaveBeenCalledTimes(1)
    expect(mockedFn).toHaveBeenCalledWith(
      'select * from token_blacklist where code=$1',
      [token]
    )
  })
})
