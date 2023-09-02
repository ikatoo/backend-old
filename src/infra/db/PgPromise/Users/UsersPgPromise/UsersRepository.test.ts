vi.mock('../..')
vi.mock('@/utils/hasher')

import * as cryptoUtil from '@/utils/hasher';
import { getFieldsWithValues } from "@/utils/transformers/getFieldsWithValues";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import UsersPgPromise from ".";
import db from "../..";

describe("Basic operations in Users Repository", () => {
  const usersRepository = new UsersPgPromise()
  const mockedUsers = [
    {
      name: 'name test1',
      email: 'test1@mail.com',
      password: 'secretpass1'
    },
    {
      name: 'name test2',
      email: 'test2@mail.com',
      password: 'secretpass2'
    },
  ]

  afterEach(() => {
    vi.restoreAllMocks()
    vi.clearAllMocks()
  })

  beforeEach(() => {
    db.none('delete from users;')
  })

  test("CREATE Method", async () => {
    const mockedFn = vi.spyOn(db, 'one').mockResolvedValueOnce({ id: 9 })
    vi.spyOn(cryptoUtil, 'hasher').mockResolvedValueOnce('hash')
    const mock = mockedUsers[0]

    const result = await usersRepository.createUser(mock)

    expect(result.id).toEqual(9)
    expect(mockedFn).toHaveBeenCalledTimes(1)
    expect(mockedFn).toHaveBeenCalledWith(
      'insert into users (name, email, password) values ($1, $2, $3) returning id',
      [mock.name, mock.email, 'hash']
    )
  });

  test("LIST ALL Method", async () => {
    const mockedData = [
      { id: 1, name: 'name1', email: 'teste1@email.com' },
      { id: 2, name: 'name2', email: 'teste2@email.com' },
    ]
    const spy = vi.spyOn(db, 'manyOrNone').mockResolvedValueOnce(mockedData)
    const results = await usersRepository.listUsers()
    const expected = mockedData

    expect(results).toEqual(expected)
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith('select id, name, email from users;')
  });

  test("GET BY EMAIL Method", async () => {
    const mock = {
      id: 1,
      name: 'name1',
      email: 'teste1@email.com',
      password: 'hash'
    }
    const spy = vi.spyOn(db, 'oneOrNone').mockResolvedValueOnce(mock)

    const result = await usersRepository.getUserByEmail(mock.email)

    expect(result).toEqual(mock)
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith(
      'select * from users where email=$1',
      mock.email
    )
  });

  test("FIND BY NAME Method", async () => {
    const mock = [
      { id: 2, name: 'name2', email: 'teste2@email.com' }
    ]
    const spy = vi.spyOn(db, 'manyOrNone').mockResolvedValueOnce(mock)

    const result = await usersRepository.findUsersByName('2')
    const expected = mock

    expect(result).toEqual(expected)
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith(
      "select id, name, email from users where name like '%$1:value%';",
      "2"
    )
  });

  test("UPDATE Method", async () => {
    const mock = mockedUsers[0]
    const spy = vi.spyOn(db, 'none').mockResolvedValueOnce(null)
    vi.spyOn(cryptoUtil, 'hasher').mockResolvedValueOnce('hash')

    const fieldValues = getFieldsWithValues({
      name: mock.name,
      email: mock.email,
      password: 'hash'
    }).toString()

    await expect(usersRepository.updateUser(7, mock))
      .resolves.not.toThrow()
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith(
      'update users set $1:raw where id=$2;',
      [fieldValues, 7]
    )
  });

  test("DELETE Method", async () => {
    const spy = vi.spyOn(db, 'none').mockResolvedValueOnce(null)

    await expect(usersRepository.deleteUser(9)).resolves.not.toThrow()
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith(
      'delete from users where id=$1',
      9
    )
  })
})
