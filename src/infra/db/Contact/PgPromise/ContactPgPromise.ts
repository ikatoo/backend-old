import Contact from "@/domain/entities/Contact";
import IContacts, { ContactIn } from "@/domain/repository/IContact";
import db from "./db";

export default class ContactPgPromise implements IContacts {
  async createContact(contact: ContactIn): Promise<void> {
    const query = `INSERT INTO "contacts" ("email"${contact.localization ? ', "localization"' : ''})
      VALUES ($1${contact.localization ? ', \'$2,$3\'' : ''});`
    const values = [
      contact.email,
      contact.localization?.latitude,
      contact.localization?.longitude
    ]

    await db.none(query, values)
  }

  async getContacts(): Promise<Contact[]> {
    const contacts = await db.manyOrNone('select * from contacts')
    const mappedContacts = contacts.map(contact => ({
      id: contact.id,
      email: contact.email,
      localization: {
        latitude: contact.localization.x,
        longitude: contact.localization.y
      }
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

}