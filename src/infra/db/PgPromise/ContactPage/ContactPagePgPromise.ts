import ContactPage from "@/domain/entities/ContactPage";
import IContactPage, { ContactPageIn } from "@/domain/repository/IContactPage";
import db from "..";

export default class ContactPagePgPromise implements IContactPage {

  async clear(): Promise<void> {
    await db.none('delete from contacts_page;')
  }

  async createContactPage(page: ContactPageIn): Promise<void> {
    await db.none('delete from contacts_page;')
    await db.none(
      `insert into contacts_page (
        title, description
      ) values ($1,$2);`,
      [
        page.title,
        page.description
      ],
    );
  }

  async getContactPage(): Promise<ContactPage> {
    const page = await db.oneOrNone('select * from contacts_page;')
    return page ?? {}
  }

  async updateContactPage(page: Partial<ContactPageIn>): Promise<void> {
    const query = `update contacts_page set ${Object.keys(page).map((key, index) =>
      `${key} = '${Object.values(page)[index]}'`)
      };`
    await db.none(query);
  }

  async deleteContactPage(): Promise<void> {
    await db.none('delete from contacts_page;')
  }

}