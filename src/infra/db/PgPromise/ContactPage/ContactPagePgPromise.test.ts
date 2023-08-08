vi.mock('..')

import { Localization } from "@/repository/IContactPage";
import contactPageMock from "@shared/mocks/contactPageMock/result.json";
import { afterEach, describe, expect, test, vi } from "vitest";
import db from "..";
import ContactPagePgPromise from "./ContactPagePgPromise";

describe("Basic operations in ContactPage Postgres Database", () => {
  const repository = new ContactPagePgPromise();

  afterEach(async () => {
    await db.none("delete from contacts_page;");
    vi.clearAllMocks()
  });

  test("CREATE Method", async () => {
    const mockedFn = vi.spyOn(db, 'none')

    await expect(repository.createContactPage(contactPageMock))
      .resolves.not.toThrow()
    expect(mockedFn).toHaveBeenCalledTimes(1)
    expect(mockedFn).toHaveBeenCalledWith(
      'insert into contacts_page (title, description, localization, email) values ($1,$2,$3,$4);',
      [
        contactPageMock.title,
        contactPageMock.description,
        `${contactPageMock.localization.lat},${contactPageMock.localization.lng}`,
        contactPageMock.email
      ],
    )
  });

  test("READ Method", async () => {
    const { localization, ...mock } = contactPageMock
    const mockedFn = vi.spyOn(db, 'oneOrNone').mockResolvedValueOnce({
      id: 1,
      localization: {
        x: localization.lat,
        y: localization.lng
      },
      ...mock
    })
    const actual = await repository.getContactPage();

    expect(contactPageMock).toEqual(actual);
    expect(mockedFn).toHaveBeenCalledTimes(1)
    expect(mockedFn).toHaveBeenCalledWith('select * from contacts_page;')
  });

  test("UPDATE Method", async () => {
    const mockedFn = vi.spyOn(db, 'none')
    const mockedValues = Object.keys(contactPageMock).map((key, index) => {
      if (key === 'localization') {
        const localization = Object.values(contactPageMock)[index] as Localization
        return `localization = \'${localization.lat},${localization.lng}\'`
      }
      return `${key} = '${Object.values(contactPageMock)[index]}'`
    }).toString()

    await expect(repository.updateContactPage(contactPageMock))
      .resolves.not.toThrow();
    expect(mockedFn).toHaveBeenCalledTimes(1)
    expect(mockedFn).toHaveBeenCalledWith(
      'update contacts_page set $1:raw;',
      [mockedValues]
    )
  });

  test("DELETE Method", async () => {
    const mockedFn = vi.spyOn(db, 'none')
    
    await expect(repository.deleteContactPage()).resolves.not.toThrow()
    expect(mockedFn).toHaveBeenCalledTimes(1)
    expect(mockedFn).toHaveBeenCalledWith('delete from contacts_page;')
  });
});