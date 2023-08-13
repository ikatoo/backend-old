import { z } from "zod";
import { Email } from "./IUser";

export const AuthSchema = z.object({
  email: Email,
  password: z.string(),
})

export type Auth = z.infer<typeof AuthSchema>

