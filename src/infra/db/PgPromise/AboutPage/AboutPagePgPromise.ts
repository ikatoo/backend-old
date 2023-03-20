import AboutPage from "@/domain/entities/AboutPage";
import { AboutPageRepository } from "../..";
import db from "../db";

export default class AboutPagePgPromise implements AboutPageRepository {
  async createAboutPage(page: AboutPage): Promise<void> {
    await db.none(`insert into about_page (
      title, description, illustrationURL, illustrationALT
    ) values ($1,$2,$3,$4);`, [
      page.title, page.description, page.illustrationURL, page.illustrationALT
    ])
  }

  async getAboutPage(): Promise<AboutPage> {
    const page = await db.oneOrNone('select * from about_page;')
    return page ?? {}
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