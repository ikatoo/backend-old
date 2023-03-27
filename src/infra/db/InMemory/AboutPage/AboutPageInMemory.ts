import AboutPage from "@/domain/entities/AboutPage";
import IAboutPage from "@/domain/repository/IAboutPage";
import { randomInt } from "crypto";

let aboutPage: AboutPage[] = [];

export default class AboutPageInMemory implements IAboutPage {
  async clear(): Promise<void> {
    aboutPage = []
  }

  async createAboutPage(page: Omit<AboutPage, "id">): Promise<void> {
    aboutPage = [{ id: randomInt(1, 2000), ...page }];
  }

  async getAboutPage(): Promise<AboutPage> {
    return aboutPage[0];
  }

  async updateAboutPage(page: Partial<Omit<AboutPage, "id">>): Promise<void> {
    aboutPage = [{ ...aboutPage[0], ...page }];
  }

  async deleteAboutPage(): Promise<void> {
    aboutPage = [];
  }
}
