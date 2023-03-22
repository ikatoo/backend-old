import AboutPage from "../entities/AboutPage";

export type AboutPageIn = Omit<AboutPage, "id" | "skills">
export type AboutPageOut = Omit<AboutPage, "skills">

export default interface IAboutPage {
  createAboutPage(page: AboutPageIn): Promise<void>;
  getAboutPage(): Promise<AboutPageOut>;
  updateAboutPage(page: Partial<AboutPageIn>): Promise<void>;
  deleteAboutPage(): Promise<void>;
}
