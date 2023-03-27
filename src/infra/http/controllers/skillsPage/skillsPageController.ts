import Skill from "@/domain/entities/Skill";
import { JobsRepository, SkillOnJobRepository } from "@/infra/db";
import { SkillsRepository } from "@/infra/db";
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
  skills: { skillTitle: string }[]
}

type SkillsPageOutput = {
  title: string,
  description: string,
  skills: SkillsOutput[],
  lastJobs: JobsOutput[]
}

async function getSkillsPageHandler(): Promise<SkillsPageOutput> {
  const skillsPageRepository = new SkillsPageRepository();
  const skillsRepository = new SkillsRepository()
  const jobsRepository = new JobsRepository()
  const skillsOnJobsRepository = new SkillOnJobRepository()

  const skillsPage = await skillsPageRepository.getSkillsPage()
  

  return {
    ...skillsPage,
    lastJobs: [],
    skills: []
  }
}

export { getSkillsPageHandler };
