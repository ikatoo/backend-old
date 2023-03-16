import AboutPage from "../entities/AboutPage";

export default interface IAboutPage {
  createAboutPage(page: AboutPage): Promise<void>;
  getAboutPage(): Promise<AboutPage>;
  updateAboutPage(page: Partial<AboutPage>): Promise<void>;
  deleteAboutPage(): Promise<void>;
}
