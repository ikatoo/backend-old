vi.mock('..')

import { getFieldsWithValues } from "@/utils/transformers/getFieldsWithValues";
import aboutPageMock from "@shared/mocks/aboutPageMock/result.json";
import { afterEach, describe, expect, test, vi } from "vitest";
import db from "..";
import AboutPagePgPromise from "./AboutPagePgPromise";

describe("Basic operations in AboutPage Postgres Database", () => {
  const repository = new AboutPagePgPromise();

  afterEach(async () => {
    await db.none('delete from about_page;')
    vi.clearAllMocks()
  })

  test("CREATE Method", async () => {
    const mockedFn = vi.spyOn(db, 'none')

    await expect(repository.createAboutPage({
      title: 'teste',
      description: 'description teste',
      skills: [{ title: 'teste1' }, { title: 'teste2' }]
    }))
      .resolves.not.toThrow()
    expect(mockedFn).toHaveBeenCalledTimes(1)
  });

  test("READ Method", async () => {
    const { illustrationALT, illustrationURL, ...mock } = aboutPageMock
    vi.spyOn(db, 'oneOrNone').mockResolvedValue({
      illustration_alt: illustrationALT,
      illustration_url: illustrationURL,
      ...mock
    })
    const actual = await repository.getAboutPage();

    expect(aboutPageMock).toEqual(actual);
  });

  test("UPDATE Method", async () => {
    const mockedFn = vi.spyOn(db, 'none')

    await expect(repository.updateAboutPage(aboutPageMock)).resolves.not.toThrow();
    expect(mockedFn).toHaveBeenCalledTimes(1)
    expect(mockedFn).toHaveBeenCalledWith(
      'update about_page set $1:raw;',
      [getFieldsWithValues(aboutPageMock).toString()]
    )
  });

  test("DELETE Method", async () => {
    const mockedFn = vi.spyOn(db, 'none')

    await expect(repository.deleteAboutPage()).resolves.not.toThrow()
    expect(mockedFn).toHaveBeenCalledTimes(1)
    expect(mockedFn).toHaveBeenCalledWith('delete from about_page;')
  });

  test("CREATE Method without optional fields", async () => {
    const mockedFn = vi.spyOn(db, 'none')

    const { illustrationALT, illustrationURL, ...mock } = aboutPageMock

    await expect(repository.createAboutPage(mock))
      .resolves.not.toThrow()
    expect(mockedFn).toHaveBeenCalledTimes(1)
  });
});
