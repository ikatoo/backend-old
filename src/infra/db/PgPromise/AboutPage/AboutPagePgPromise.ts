import IAboutPage, { AboutPage } from "@/repository/IAboutPage";
import db from "..";
import { getFieldsWithValues } from "@/utils/transformers/getFieldsWithValues";

export default class AboutPagePgPromise implements IAboutPage {
  async clear(): Promise<void> {
    await db.none('delete from about_page;')
  }

  async createAboutPage(page: AboutPage): Promise<void> {
    await db.none(`insert into about_page (
      title, description, illustration_url, illustration_alt, skills
    ) values ($1,$2,$3,$4,$5);`, [
      page.title,
      page.description,
      page.illustrationURL,
      page.illustrationALT,
      { skills: page.skills }
    ])
  }

  async getAboutPage(): Promise<AboutPage | undefined> {
    const page = await db.oneOrNone('select * from about_page;')
    if (!page) return
    return {
      title: page.title,
      description: page.description,
      skills: page.skills.skills,
      illustrationURL: page.illustration_url,
      illustrationALT: page.illustration_alt
    }
  }

  async updateAboutPage(page: Partial<AboutPage>): Promise<void> {
    const fieldsWithValues = getFieldsWithValues<AboutPage>(page)

    const query = `update about_page set ${fieldsWithValues};`
    await db.none(query);
  }

  async deleteAboutPage(): Promise<void> {
    await db.none('delete from about_page;')
  }
}