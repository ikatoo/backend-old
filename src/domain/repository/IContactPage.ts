import ContactPage from "../entities/ContactPage";

export type ContactPageIn = Omit<ContactPage, "id" | "contact" >
export type ContactPageOut = Omit<ContactPage, "contact" >

export default interface IContactPage {
  createContactPage(page: ContactPageIn): Promise<void>;
  getContactPage(): Promise<ContactPageOut>;
  updateContactPage(page: Partial<ContactPageIn>): Promise<void>;
  deleteContactPage(): Promise<void>;
}
