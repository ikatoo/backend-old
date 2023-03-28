type Skill = {
  skillTitle: string
  rankPercent: number
}

type Job = {
  jobTitle: string
  jobDescription: string
  yearMonthStart: string
  yearMonthEnd?: string
  link: string
}

export type SkillsPage = {
  title: string
  description: string
  skills: Skill[]
  lastJobs: Job[]
}

export default interface ISkillsPage {
  createSkillsPage(page: SkillsPage): Promise<void>;
  getSkillsPage(): Promise<SkillsPage | undefined>;
  updateSkillsPage(page: Partial<SkillsPage>): Promise<void>;
  deleteSkillsPage(): Promise<void>;
  clear(): Promise<void>
}
