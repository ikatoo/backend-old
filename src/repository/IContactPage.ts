export type Localization = {
  lat: number
  lng: number
}

export type ContactPage = {
  title: string
  description: string
  localization: Localization
}

export default interface IContactPage {
  createContactPage(page: ContactPage): Promise<void>;
  getContactPage(): Promise<ContactPage | undefined>;
  updateContactPage(page: Partial<ContactPage>): Promise<void>;
  deleteContactPage(): Promise<void>;
  clear(): Promise<void>
}
