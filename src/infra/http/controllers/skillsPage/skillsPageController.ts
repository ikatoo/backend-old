import { SkillsPageRepository } from "@/infra/db";
import { dateNumberToString, dateToString } from "@/utils/transformers/dateTransform";

type SkillsOutput = {
  skillTitle: string
  rankPercent: number
}

type JobsOutput = {
  jobTitle: string,
  jobDescription: string
  yearMonthStart: string
  yearMonthEnd?: string
  link: string
}

type SkillsPageOutput = {
  title: string,
  description: string,
  skills: SkillsOutput[],
  lastJobs: JobsOutput[]
}

async function getSkillsPageHandler(): Promise<SkillsPageOutput | undefined> {
  const skillsPageRepository = new SkillsPageRepository();

  const skillsPage = await skillsPageRepository.getSkillsPage()
  if (!skillsPage) return undefined

  return {
    ...skillsPage,
    lastJobs: [],
    skills: []
  }
}

export { getSkillsPageHandler };
