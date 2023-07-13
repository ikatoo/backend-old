import { z } from "zod"

export const LocalizationSchema = z.object({
  lat: z.number(),
  lng: z.number()
})

export const ContactPageSchema = z.object({
  title: z.string(),
  description: z.string(),
  localization: LocalizationSchema,
  email: z.string({required_error: 'Email is required'}).email({message: 'Invalid email address'})
})

export const PartialContactPageSchema = ContactPageSchema.partial()

export type ContactPage = z.infer<typeof ContactPageSchema>
export type Localization = z.infer<typeof LocalizationSchema>

export default interface IContactPage {
  createContactPage(page: ContactPage): Promise<void>;
  getContactPage(): Promise<ContactPage | undefined>;
  updateContactPage(page: Partial<ContactPage>): Promise<void>;
  deleteContactPage(): Promise<void>;
  clear(): Promise<void>
}
