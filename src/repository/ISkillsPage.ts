import { z } from "zod"

export const SkillsPageSchema = z.object({
  title: z.string(),
  description: z.string(),
  skills: z.array(z.object({
    skillTitle: z.string(),
  })),
  lastJobs: z.array(z.object({
    jobTitle: z.string(),
    jobDescription: z.string(),
    yearMonthStart: z.string(),
    yearMonthEnd: z.string().optional(),
    link: z.string()
  }))
})

export const PartialSkillsPageSchema = SkillsPageSchema.partial()

export type SkillsPage = z.infer<typeof SkillsPageSchema>

export default interface ISkillsPage {
  createSkillsPage(page: SkillsPage): Promise<void>;
  getSkillsPage(): Promise<SkillsPage | undefined>;
  updateSkillsPage(page: Partial<SkillsPage>): Promise<void>;
  deleteSkillsPage(): Promise<void>;
  clear(): Promise<void>
}
