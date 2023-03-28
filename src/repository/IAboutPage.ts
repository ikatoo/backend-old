type Skill = {
  title: string
}

export type AboutPage = {
  title: string
  description: string
  skills: Skill[]
  illustrationURL: string
  illustrationALT: string
}

export default interface IAboutPage {
  createAboutPage(page: AboutPage): Promise<void>;
  getAboutPage(): Promise<AboutPage | undefined>;
  updateAboutPage(page: Partial<AboutPage>): Promise<void>;
  deleteAboutPage(): Promise<void>;
  clear(): Promise<void>
}
