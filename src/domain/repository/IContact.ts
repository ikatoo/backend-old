import Contact from "../entities/Contact";

export type ContactIn = Omit<Contact, "id">;

export default interface IContacts {
  createContact(contact: ContactIn): Promise<void>;
  getContacts(): Promise<Contact[]>;
  updateContact(id: number, contact: Partial<ContactIn>): Promise<void>;
  deleteContact(id: number): Promise<void>;
}
