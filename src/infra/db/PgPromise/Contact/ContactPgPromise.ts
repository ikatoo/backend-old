import IContacts, { ContactIn, ContactOut } from "@/domain/repository/IContact";
import db from "..";

export default class ContactPgPromise implements IContacts {

  async clear(): Promise<void> {
    await db.none('delete from contacts;')
  }

  async createContact(contact: ContactIn): Promise<void> {
    const query = `INSERT INTO "contacts" ("email"
        ${contact.localization ? ', "localization"' : ''}
        ${contact.contactPageId ? ', "contact_page_id"' : ''}
      )
      VALUES ($\{email\}
        ${contact.localization ? ', \'${localization.latitude},${localization.longitude}\'' : ''}
        ${contact.contactPageId ? ', ${contactPageId}' : ''}
      );`

    await db.none(query, contact)
  }

  async getContacts(): Promise<ContactOut[]> {
    const contacts = await db.manyOrNone('select * from contacts')
    const mappedContacts = contacts.map(contact => ({
      id: contact.id,
      email: contact.email,
      localization: {
        latitude: contact.localization.x,
        longitude: contact.localization.y
      },
      contactPageId: contact.contact_page_id
    }))

    return [...mappedContacts]
  }

  async updateContact(id: number, contact: Partial<ContactIn>): Promise<void> {
    const query = `update contacts set ${Object.keys(contact).map((key, index) => `${key} = $${index + 1}`)}
     where id = ${id}`
    const values = Object.values(contact).map(value => {
      if (typeof value === "object") return `${value.latitude}, ${value.longitude}`
      return value
    })

    await db.none(query, values);
  }

  async deleteContact(id: number): Promise<void> {
    await db.none('delete from contacts where id = $1', id)
  }

  async getContactsByContactPageId(contactPageId: number): Promise<ContactOut[]> {
    const contacts = await db.manyOrNone(
      'select * from contacts where contact_page_id = $1',
      contactPageId
    )
    const mappedContacts = contacts.map(contact => ({
      id: contact.id,
      email: contact.email,
      localization: {
        latitude: contact.localization.x,
        longitude: contact.localization.y
      },
      contactPageId: contact.contact_page_id
    }))

    return [...mappedContacts]
  }

}