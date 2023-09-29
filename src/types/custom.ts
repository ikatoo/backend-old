import { z } from "zod"

export const EmailSchema = z.string().email("is not valid format of email")
export type Email = z.infer<typeof EmailSchema>

export const UrlSchema = z.string().url('is not valid URL format')
export type URL = z.infer<typeof UrlSchema>

export const SemVer = z.string().regex(
  /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/gm,
  { message: 'is not a valid semantic version format' }
)
export type SemVer = z.infer<typeof SemVer>
