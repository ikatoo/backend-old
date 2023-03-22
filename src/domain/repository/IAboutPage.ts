import AboutPage from "../entities/AboutPage";

export default interface IAboutPage {
  createAboutPage(page: Omit<AboutPage, 'id'>): Promise<void>;
  getAboutPage(): Promise<AboutPage>;
  updateAboutPage(page: Partial<Omit<AboutPage, 'id'>>): Promise<void>;
  deleteAboutPage(): Promise<void>;
}
