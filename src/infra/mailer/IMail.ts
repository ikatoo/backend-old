import { z } from "zod"

const MailSchema = z.object({
  from: z.string().email('is not valid email format'),
  to: z.string().email('is not valid email format'),
  subject: z.string(),
  message: z.string(),
})

export type Mail = z.infer<typeof MailSchema>

export type MailerResult = { accepted: boolean, response: string }

export interface IMail {
  send(mail: Mail): Promise<MailerResult>
}
