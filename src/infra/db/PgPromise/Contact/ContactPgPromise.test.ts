import { ContactIn } from "@/domain/repository/IContact";
import contactPageMock from "@/mock/contactPageMock";
import { afterEach, describe, expect, test } from "vitest";
import ContactPgPromise from "./ContactPgPromise";
import db from "..";

describe("Basic operations in Contact Postgres Database", () => {
  const repository = new ContactPgPromise();

  afterEach(async () => {
    await db.none("delete from contacts;");
  });

  test("CREATE Method", async () => {
    const contactMock: ContactIn = {
      email: "this@email.com",
      localization: {
        latitude: contactPageMock.localization.lat,
        longitude: contactPageMock.localization.lng
      },
      contactPageId: 3
    };
    await expect(repository.createContact(contactMock))
      .resolves.not.toThrow()
  })

  test("READ Method", async () => {
    const contactMock: ContactIn = {
      email: "this@email.com",
      localization: {
        latitude: contactPageMock.localization.lat,
        longitude: contactPageMock.localization.lng
      }
    };
    await repository.createContact(contactMock);
    const contactInDb = await db.one(
      "select * from contacts where email = $1",
      contactMock.email,
    );
    const expected = [{
      id: contactInDb.id,
      ...contactMock,
      contactPageId: contactInDb.contact_page_id
    }];
    const actual = await repository.getContacts();

    expect(expected).toEqual(actual);
  });

  test("UPDATE Method", async () => {
    const contactMock: ContactIn = {
      email: "this@email.com",
      localization: {
        latitude: contactPageMock.localization.lat,
        longitude: contactPageMock.localization.lng
      }
    };
    await repository.createContact(contactMock);
    const contactInDb = await db.one(
      "select * from Contacts where email = $1",
      contactMock.email,
    );
    const newValue = {
      email: 'new@email.com',
      localization: {
        latitude: -22.528850083857423,
        longitude: -46.630700405308185
      }
    };
    await repository.updateContact(contactInDb.id, newValue);
    const expected = [{
      id: contactInDb.id,
      ...contactMock,
      ...newValue,
      contactPageId: contactInDb.contact_page_id
    }];
    const actual = await repository.getContacts();

    expect(expected).toEqual(actual);
  });

  test("DELETE Method", async () => {
    const contactMock: ContactIn = {
      email: "this@email.com",
      localization: {
        latitude: contactPageMock.localization.lat,
        longitude: contactPageMock.localization.lng
      }
    };
    await repository.createContact(contactMock);
    const contactInDb = await db.one(
      "select * from Contacts where email = $1",
      contactMock.email,
    );
    await repository.deleteContact(contactInDb.id);
    const expected: [] = [];
    const actual = await repository.getContacts();

    expect(expected).toEqual(actual);
  });


  test("Get contacts by contact_page_id", async () => {
    let expected: ContactIn[] = []
    for (let index = 0; index < 4; index++) {
      const contact = {
        email: `newemail${index}@email.com`,
        localization: {
          latitude: contactPageMock.localization.lat + ((index + 1) / 10),
          longitude: contactPageMock.localization.lng + ((index + 1) / 10)
        },
        contactPageId: index < 3 ? 1 : index
      }
      expected = index < 3 ? [...expected, contact] : expected
      await repository.createContact(contact);
    }

    const actual = (await repository.getContactsByContactPageId(1)).map(contact => {
      const { id, ...rest } = contact
      return rest
    })

    expect(expected).toEqual(actual);
  });
});