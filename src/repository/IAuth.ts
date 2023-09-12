import { z } from "zod";
import { EmailSchema } from "./IUser";

export const AuthSchema = z.object({
  email: EmailSchema,
  password: z.string(),
})

export type Auth = z.infer<typeof AuthSchema>

