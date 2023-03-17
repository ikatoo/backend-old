import AboutPage from "@/domain/entities/AboutPage";
import IAboutPage from "@/domain/repository/IAboutPage";
import aboutPageMock from "@/mock/aboutPageMock";

let aboutPage: AboutPage[] = [aboutPageMock];

export default class AboutPageInMemory implements IAboutPage {
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
