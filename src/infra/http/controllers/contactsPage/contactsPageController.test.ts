import { ContactPageRepository } from "@/infra/db";
import contactPageMock from "@/mock/contactPageMock";
import { afterEach, describe, expect, test } from "vitest";
import { getContactsPageHandler } from "./contactsPageController";

describe("ContactsPage Controller test", () => {
  const contactsPageRepository = new ContactPageRepository()

  afterEach(async () => {
    await contactsPageRepository.clear()
  })

  test("Get contacts page data", async () => {
    await contactsPageRepository.createContactPage(contactPageMock);
    const result = await getContactsPageHandler()

    expect(contactPageMock).toEqual(result);
  });
});
