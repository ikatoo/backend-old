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

    await expect(repository.createAboutPage(aboutPageMock))
      .resolves.not.toThrow()
    expect(mockedFn).toHaveBeenCalledTimes(1)
    expect(mockedFn).toHaveBeenCalledWith(
      'insert into about_page (title, description, illustration_url, illustration_alt, skills) values ($1,$2,$3,$4,$5);',
      [
        aboutPageMock.title,
        aboutPageMock.description,
        aboutPageMock.illustrationURL,
        aboutPageMock.illustrationALT,
        JSON.stringify(aboutPageMock.skills)
      ])
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
});
