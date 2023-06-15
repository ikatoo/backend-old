import { afterEach, describe, expect, test } from "vitest";
import ContactPagePgPromise from "./ContactPagePgPromise";
import db from "..";
import contactPageMock from "@shared/mocks/contactPageMock/result.json";
import { ContactPage } from "@/repository/IContactPage";

describe("Basic operations in ContactPage Postgres Database", () => {
  const repository = new ContactPagePgPromise();

  afterEach(async () => {
    await db.none("delete from contacts_page;");
  });

  test("CREATE Method", async () => {
    await expect(repository.createContactPage(contactPageMock))
      .resolves.not.toThrow()
  });

  test("READ Method", async () => {
    await repository.createContactPage(contactPageMock);
    const pageInDb = await db.one(
      "select * from contacts_page where title = $1",
      contactPageMock.title,
    );
    const actual = await repository.getContactPage();

    expect(contactPageMock).toEqual(actual);
  });

  test("UPDATE Method", async () => {
    await repository.createContactPage(contactPageMock);
    const newValue: Partial<ContactPage> = {
      description: "new description",
      localization: {
        lat: 2,
        lng: 3
      }
    };
    await repository.updateContactPage(newValue);
    const actual = await repository.getContactPage();

    expect({ ...contactPageMock, ...newValue }).toEqual(actual);
  });

  test("DELETE Method", async () => {
    await repository.createContactPage(contactPageMock);
    await repository.deleteContactPage();
    const expected = undefined;
    const actual = await repository.getContactPage();

    expect(expected).toEqual(actual);
  });
});