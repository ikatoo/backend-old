import { ISkillOnJob, SkillOnJob } from "@/domain/repository/ISkillOnJob"
import db from "./db"

export default class SkillOnJobPgPromise implements ISkillOnJob {

  async clear(): Promise<void> {
    await db.none('delete from skills_jobs;')
  }

  async getSkillsByJobId(jobId: number): Promise<SkillOnJob[]> {
    const skillsJobs = await db.manyOrNone(
      'select * from skills_jobs where job_id = $1',
      jobId
    ) ?? {}
    const mappedSkillsJobs = skillsJobs.map(skillJob => ({
      jobId: skillJob.job_id,
      skillId: skillJob.skill_id
    }))

    return mappedSkillsJobs
  }

  async getJobsBySkillId(skillId: number): Promise<SkillOnJob[]> {
    const skillsJobs = await db.manyOrNone(
      'select * from skills_jobs where skill_id = $1',
      skillId
    ) ?? {}
    const mappedSkillsJobs = skillsJobs.map(skillJob => ({
      jobId: skillJob.job_id,
      skillId: skillJob.skill_id
    }))

    return mappedSkillsJobs
  }

  async createSkillOnJob(skillOnJob: SkillOnJob) {
    await db.none(
      `insert into skills_jobs (
        job_id, skill_id
      ) values ($1,$2);`,
      [
        skillOnJob.jobId,
        skillOnJob.skillId
      ],
    )
  }

  async updateSkillOnJob(oldValue: SkillOnJob, newValue: SkillOnJob): Promise<void> {
    const exists = await db.oneOrNone(
      'select * from skills_jobs where skill_id = $1 and job_id = $2;',
      [newValue.skillId, newValue.jobId]
    )
    if(exists) throw new Error("Relation between skill and job already exists.");
    
    
    const query = `update skills_jobs set skill_id = $1, job_id = $2 
      where skill_id = $3 and job_id = $4;`
    await db.none(query, [
      newValue.skillId,
      newValue.jobId,
      oldValue.skillId,
      oldValue.jobId
    ]);
  }

  async deleteSkillOnJob(skillOnJob: SkillOnJob): Promise<void> {
    await db.none(
      `delete from skills_jobs where skill_id = $1 and job_id = $2`,
      [
        skillOnJob.skillId,
        skillOnJob.jobId
      ]
    )
  }

}