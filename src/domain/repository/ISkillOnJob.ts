export type SkillOnJob = {
  jobId: number
  skillId: number
}

export interface ISkillOnJob {
  createSkillOnJob(skillOnJob: SkillOnJob): Promise<void>
  getSkillsByJobId(jobId: number): Promise<SkillOnJob[]>
  getJobsBySkillId(skillId: number): Promise<SkillOnJob[]>
  updateSkillOnJob(oldValue: SkillOnJob, newValue: SkillOnJob): Promise<void>
  deleteSkillOnJob(skillOnJob: SkillOnJob): Promise<void>
  clear(): Promise<void>
}