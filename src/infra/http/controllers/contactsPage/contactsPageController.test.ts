import { ContactPageRepository } from "@/infra/db";
import contactPageMock from "@shared/mocks/contactPageMock/result.json";
import { afterEach, describe, expect, test, vi } from "vitest";
import { createContactsPageHandler, deleteContactsPageHandler, getContactsPageHandler, updateContactsPageHandler } from "./contactsPageController";

describe("ContactsPage Controller test", () => {
  afterEach(async () => {
    vi.clearAllMocks()
    vi.resetAllMocks()
  })

  test("Get contacts page data", async () => {
    const spy = vi.spyOn(ContactPageRepository.prototype, 'getContactPage').mockResolvedValueOnce(contactPageMock)
    const result = await getContactsPageHandler()

    expect(result?.body).toEqual(contactPageMock);
    expect(spy).toHaveBeenCalledTimes(1)
  });

  test("Create contacts page data without error", async () => {
    const spy = vi.spyOn(ContactPageRepository.prototype, 'createContactPage').mockResolvedValueOnce()

    await expect(createContactsPageHandler({ parameters: contactPageMock }))
      .resolves.not.toThrow()
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith(contactPageMock)
  });

  test("Update contacts page data without error", async () => {
    const mockedData = {
      title: 'new title',
      description: 'new Description'
    }
    const spy = vi.spyOn(ContactPageRepository.prototype, 'updateContactPage').mockResolvedValueOnce()

    await expect(updateContactsPageHandler({ parameters: mockedData }))
      .resolves.not.toThrow()
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith(mockedData)
  });

  test("Delete contacts page data", async () => {
    const spy = vi.spyOn(ContactPageRepository.prototype, 'deleteContactPage').mockResolvedValueOnce()

    await expect(deleteContactsPageHandler())
      .resolves.not.toThrow()
    expect(spy).toHaveBeenCalledTimes(1)
  });
});
