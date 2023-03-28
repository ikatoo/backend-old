import IAboutPage, { AboutPage } from "@/repository/IAboutPage";
import { randomInt } from "crypto";

let aboutPage: AboutPage[] = [];

export default class AboutPageInMemory implements IAboutPage {
  async clear(): Promise<void> {
    aboutPage = []
  }

  async createAboutPage(page: AboutPage): Promise<void> {
    aboutPage = [page];
  }

  async getAboutPage(): Promise<AboutPage> {
    return aboutPage[0];
  }

  async updateAboutPage(page: Partial<AboutPage>): Promise<void> {
    aboutPage = [{ ...aboutPage[0], ...page }];
  }

  async deleteAboutPage(): Promise<void> {
    aboutPage = [];
  }
}
