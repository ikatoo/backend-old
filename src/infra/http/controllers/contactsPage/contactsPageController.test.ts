import { ContactPageRepository } from "@/infra/db";
import contactPageMock from "@/mock/contactPageMock";
import { afterEach, describe, expect, test } from "vitest";
import { createContactsPageHandler, deleteContactsPageHandler, getContactsPageHandler, updateContactsPageHandler } from "./contactsPageController";

describe("ContactsPage Controller test", () => {
  const contactsPageRepository = new ContactPageRepository()

  afterEach(async () => {
    await contactsPageRepository.clear()
  })

  test("Get contacts page data", async () => {
    await contactsPageRepository.createContactPage(contactPageMock);
    const result = await getContactsPageHandler()

    expect(contactPageMock).toEqual(result.body);
  });

  test("Create contacts page data without error", async () => {
    await expect(createContactsPageHandler({ page: contactPageMock }))
      .resolves.not.toThrow()
    const page = await contactsPageRepository.getContactPage()

    expect(page).toEqual(contactPageMock)
  });

  test("Update contacts page data without error", async () => {
    await contactsPageRepository.createContactPage(contactPageMock);
    const newData = {
      title: 'new title',
      description: 'new Description'
    }
    await expect(updateContactsPageHandler({ page: newData }))
      .resolves.not.toThrow()
    const page = await contactsPageRepository.getContactPage()

    expect(page).toEqual({ ...contactPageMock, ...newData })
  });

  test("Delete contacts page data", async () => {
    await contactsPageRepository.createContactPage(contactPageMock);
    await expect(deleteContactsPageHandler())
      .resolves.not.toThrow()
    const page = await contactsPageRepository.getContactPage()

    expect(page).toBeUndefined()
  });
});
