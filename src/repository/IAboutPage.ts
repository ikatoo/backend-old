import { z } from "zod"

export const AboutPageSchema = z.object({
  title: z.string(),
  description: z.string(),
  skills: z.array(z.object({
    title: z.string()
  })),
  illustrationURL: z.string(),
  illustrationALT: z.string(),
})

export const PartialAboutPageSchema = AboutPageSchema.partial()

export type AboutPage = z.infer<typeof AboutPageSchema>

export default interface IAboutPage {
  createAboutPage(page: AboutPage): Promise<void>;
  getAboutPage(): Promise<AboutPage | undefined>;
  updateAboutPage(page: Partial<AboutPage>): Promise<void>;
  deleteAboutPage(): Promise<void>;
  clear(): Promise<void>
}
