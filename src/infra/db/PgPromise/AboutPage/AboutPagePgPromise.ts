import IAboutPage, { AboutPage } from "@/repository/IAboutPage";
import db from "..";
import { getFieldsWithValues } from "@/utils/transformers/getFieldsWithValues";

export default class AboutPagePgPromise implements IAboutPage {
  async clear(): Promise<void> {
    await db.none('delete from about_page;')
  }

  async createAboutPage(page: AboutPage): Promise<void> {
    const keys = Object.keys(page)
    const values = Object.values(page)
    await db.none(
      'insert into about_page ($1) values ($2);',
      [ keys, values ])
  }

  async getAboutPage(): Promise<AboutPage | undefined> {
    const page = await db.oneOrNone('select * from about_page;')
    if (!page) return
    return {
      title: page.title,
      description: page.description,
      skills: page.skills,
      illustrationURL: page.illustration_url,
      illustrationALT: page.illustration_alt
    }
  }

  async updateAboutPage(page: Partial<AboutPage>): Promise<void> {
    const values = getFieldsWithValues(page).toString()

    await db.none('update about_page set $1:raw;', [values])
  }

  async deleteAboutPage(): Promise<void> {
    await db.none('delete from about_page;')
  }
}
