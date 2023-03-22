import AboutPage from "@/domain/entities/AboutPage";
import IAboutPage from "@/domain/repository/IAboutPage";
import db from "./db";

export default class AboutPagePgPromise implements IAboutPage {
  async createAboutPage(page: AboutPage): Promise<void> {
    await db.none(`insert into about_page (
      title, description, illustration_url, illustration_alt
    ) values ($1,$2,$3,$4);`, [
      page.title, page.description, page.illustrationURL, page.illustrationALT
    ])
  }

  async getAboutPage(): Promise<AboutPage> {
    const page = await db.oneOrNone('select * from about_page;')
    return {
      title: page.title,
      description: page.description,
      skills: page.skills,
      illustrationURL: page.illustration_url,
      illustrationALT: page.illustration_alt
    } ?? {}
  }

  async updateAboutPage(page: Partial<AboutPage>): Promise<void> {
    for (const item of Object.keys(page)) {

    }

    await db.none(`update about_page set `)
  }

  async deleteAboutPage(): Promise<void> {
    throw new Error("Method not implemented.");
  }
}