import IContactPage, { ContactPage, Localization } from "@/repository/IContactPage";
import db from "..";

export default class ContactPagePgPromise implements IContactPage {

  async clear(): Promise<void> {
    await db.none('delete from contacts_page;')
  }

  async createContactPage(page: ContactPage): Promise<void> {
    await db.none(
      `insert into contacts_page (
        title, description, localization, email
      ) values ($1,$2,$3,$4);`,
      [
        page.title,
        page.description,
        `${page.localization.lat},${page.localization.lng}`,
        page.email
      ],
    );
  }

  async getContactPage(): Promise<ContactPage | undefined> {
    const page = await db.oneOrNone('select * from contacts_page;')
    if (!page) return

    return {
      title: page.title,
      description: page.description,
      localization: {
        lat: page.localization.x,
        lng: page.localization.y,
      },
      email: page.email
    }
  }

  async updateContactPage(page: Partial<ContactPage>): Promise<void> {
    const query = `update contacts_page set ${Object.keys(page).map((key, index) => {
      if (key === 'localization') {
        const localization = Object.values(page)[index] as Localization
        return `localization = \'${localization.lat},${localization.lng}\'`
      }

      return `${key} = '${Object.values(page)[index]}'`
    })};`
    await db.none(query);
  }

  async deleteContactPage(): Promise<void> {
    await db.none('delete from contacts_page;')
  }

}