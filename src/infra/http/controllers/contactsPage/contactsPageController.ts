import { ContactPageRepository } from "@/infra/db";
import { ContactPage } from "@/repository/IContactPage";

const contactsPageRepository = new ContactPageRepository();

async function getContactsPageHandler(): Promise<ContactPage | undefined> {
  const contactPage = await contactsPageRepository.getContactPage()
  if (!contactPage) return undefined

  return contactPage
}

async function createContactsPageHandler(page: ContactPage): Promise<void> {
  await contactsPageRepository.createContactPage(page)
}

async function updateContactsPageHandler(page: Partial<ContactPage>): Promise<void> {
  await contactsPageRepository.updateContactPage(page)
}

async function deleteContactsPageHandler(): Promise<void> {
  await contactsPageRepository.deleteContactPage()
}

export {
  getContactsPageHandler,
  createContactsPageHandler,
  updateContactsPageHandler,
  deleteContactsPageHandler
};
