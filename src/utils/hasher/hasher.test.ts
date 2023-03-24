import { describe, expect, test } from 'vitest'
import { compareHash, hasher } from '.'

describe('Hashing password', () => {
  test('should generate a hash password and compare', async () => {
    const password = 'test123'

    const hash = await hasher(10, password)

    expect(hash).toBeDefined()
    expect(await compareHash(password, hash)).toBe(true)
  })
})