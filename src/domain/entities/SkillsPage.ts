type Skill = {
  skillTitle: string,
  rankPercent: number
}

type Job = {
  jobTitle: string
  jobDescription: string
  yearMonthStart: string
  yearMonthEnd?: string
  link: string
}

export default class SkillsPage {
  constructor(
    title: string,
    description: string,
    skills: Skill[],
    lastJobs: Job[]
  ) {}
}
