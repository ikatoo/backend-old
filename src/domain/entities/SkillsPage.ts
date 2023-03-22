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
    readonly id: number,
    readonly title: string,
    readonly description: string,
    readonly skills: Skill[],
    readonly lastJobs: Job[]
  ) {}
}
