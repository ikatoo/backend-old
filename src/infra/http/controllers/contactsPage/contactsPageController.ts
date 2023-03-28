import { ContactPageRepository } from "@/infra/db";

type ContactsPageOutput = {
  title: string
  description: string
  localization: {
    lat: number
    lng: number
  }
}

async function getContactsPageHandler(): Promise<ContactsPageOutput | undefined> {
  const contactsPageRepository = new ContactPageRepository();

  const contactPage = await contactsPageRepository.getContactPage()
  if (!contactPage) return undefined

  return contactPage
}

export { getContactsPageHandler };
