import { afterEach, describe, expect, test } from "vitest";
import ContactPagePgPromise from "./ContactPagePgPromise";
import db from "..";

describe("Basic operations in ContactPage Postgres Database", () => {
  const repository = new ContactPagePgPromise();

  afterEach(async () => {
    await db.none("delete from contacts_page;");
  });

  test("CREATE Method", async () => {
    const pageMock = {
      title: 'contact title',
      description: 'description',
    };
    await expect(repository.createContactPage(pageMock))
      .resolves.not.toThrow()
  });

  test("READ Method", async () => {
    const pageMock = {
      title: 'contact title',
      description: 'description',
    };
    await repository.createContactPage(pageMock);
    const pageInDb = await db.one(
      "select * from contacts_page where title = $1",
      pageMock.title,
    );
    const expected = { id: pageInDb.id, ...pageMock };
    const actual = await repository.getContactPage();

    expect(expected).toEqual(actual);
  });

  test("UPDATE Method", async () => {
    const pageMock = {
      title: 'contact title',
      description: 'description',
    };
    await repository.createContactPage(pageMock);
    const pageInDb = await db.one(
      "select * from contacts_page where title = $1",
      pageMock.title,
    );
    const newValue = {
      description: "new description",
    };
    await repository.updateContactPage(newValue);
    const expected = { id: pageInDb.id, ...pageMock, ...newValue };
    const actual = await repository.getContactPage();

    expect(expected).toEqual(actual);
  });

  test("DELETE Method", async () => {
    const pageMock = {
      title: 'contact title',
      description: 'description',
    };
    await repository.createContactPage(pageMock);
    await repository.deleteContactPage();
    const expected = {};
    const actual = await repository.getContactPage();

    expect(expected).toEqual(actual);
  });
});