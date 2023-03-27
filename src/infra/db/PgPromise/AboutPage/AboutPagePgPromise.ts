import AboutPage from "@/domain/entities/AboutPage";
import IAboutPage, { AboutPageIn } from "@/domain/repository/IAboutPage";
import db from "..";

export default class AboutPagePgPromise implements IAboutPage {
  async clear(): Promise<void> {
    await db.none('delete from about_page;')
  }

  async createAboutPage(page: Omit<AboutPage, "id">): Promise<void> {
    await db.none(`insert into about_page (
      title, description, illustration_url, illustration_alt
    ) values ($1,$2,$3,$4);`, [
      page.title, page.description, page.illustrationURL, page.illustrationALT
    ])
  }

  async getAboutPage(): Promise<AboutPage> {
    const page = await db.oneOrNone('select * from about_page;') ?? {}
    return {
      id: page.id,
      title: page.title,
      description: page.description,
      skills: page.skills,
      illustrationURL: page.illustration_url,
      illustrationALT: page.illustration_alt
    }
  }

  async updateAboutPage(page: Partial<AboutPageIn>): Promise<void> {
    const query = `update about_page set ${Object.keys(page).map((key, index) =>
      `${key} = '${Object.values(page)[index]}';`)
      }`
    await db.none(query);
  }

  async deleteAboutPage(): Promise<void> {
    await db.none('delete from about_page;')
  }
}