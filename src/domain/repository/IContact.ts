import Contact from "../entities/Contact";

export type ContactIn = Omit<Contact, "id"> & { contactPageId?: number }
export type ContactOut = Contact & { contactPageId?: number }

export default interface IContacts {
  createContact(contact: ContactIn): Promise<void>;
  getContacts(): Promise<ContactOut[]>;
  updateContact(id: number, contact: Partial<ContactIn>): Promise<void>;
  deleteContact(id: number): Promise<void>;
}
