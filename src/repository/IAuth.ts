import { EmailSchema } from "@/types/custom";
import { z } from "zod";

export const AuthSchema = z.object({
  email: EmailSchema,
  password: z.string(),
})

export type Auth = z.infer<typeof AuthSchema>

