import { SkillOnJob } from "@/domain/repository/ISkillOnJob";
import { afterEach, describe, expect, test } from "vitest";
import db from "..";
import { JobsRepository, SkillsRepository } from "../..";
import SkillOnJobPgPromise from "./SkillOnJobPgPromise";

describe('Basic operations in Skills_Jobs PgPromise Database', () => {
  const skillsOnJobsRepository = new SkillOnJobPgPromise()
  const skillsRepository = new SkillsRepository()
  const jobsRepository = new JobsRepository()

  afterEach(async () => {
    await db.none('delete from skills_jobs;')
    await db.none('delete from skills;')
    await db.none('delete from jobs;')
  })

  test('CREATE Method', async () => {
    await skillsRepository.createSkill({
      title: 'test',
    })
    await jobsRepository.createJob({
      title: 'job test',
      description: 'job descr',
      link: 'job link',
      start: new Date().getTime(),
    })
    const skills = await skillsRepository.getSkills()
    const jobs = await jobsRepository.getJobs()
    const skillOnJobMock = {
      skillId: skills[0].id,
      jobId: jobs[0].id
    }

    await expect(skillsOnJobsRepository.createSkillOnJob(skillOnJobMock))
      .resolves.not.toThrow()
  })

  test('READ Method', async () => {
    await skillsRepository.createSkill({
      title: 'test',
    })
    await jobsRepository.createJob({
      title: 'job test',
      description: 'job descr',
      link: 'job link',
      start: new Date().getTime(),
    })
    const skill = await skillsRepository.getSkillByTitle('test')
    const job = await jobsRepository.getJobByTitle('job test')
    const skillOnJobMock: SkillOnJob = {
      skillId: skill?.id ?? 0,
      jobId: job?.id ?? 0
    }
    await skillsOnJobsRepository.createSkillOnJob(skillOnJobMock)
    const expected = [skillOnJobMock]
    const actual = await skillsOnJobsRepository.getJobsBySkillId(skillOnJobMock.skillId)

    expect(expected).toEqual(actual)
  })

  test('UPDATE old job with new skill', async () => {
    const oldJobValues = {
      title: 'old job test',
      description: 'old job descr',
      link: 'old job link',
      start: new Date().getTime(),
    }
    const oldSkillValues = {
      title: 'old skill test',
    }
    const newSkillValues = {
      title: 'new skill test',
    }

    await jobsRepository.createJob(oldJobValues)
    await skillsRepository.createSkill(oldSkillValues)
    const skill = await skillsRepository.getSkillByTitle(oldSkillValues.title)
    const job = await jobsRepository.getJobByTitle(oldJobValues.title)
    const oldValue: SkillOnJob = {
      skillId: skill?.id ?? 0,
      jobId: job?.id ?? 0
    }
    await skillsOnJobsRepository.createSkillOnJob(oldValue)

    // const newSkill = await skillsRepository.getSkillByTitle(newSkillValues.title)
    // const newValue: SkillOnJob = {
    //   skillId: newSkill?.id ?? 0,
    //   jobId: job?.id ?? 0
    // }
  })

  test('NOT update with existent value', async () => {
    await skillsRepository.createSkill({
      title: 'test',
    })
    await jobsRepository.createJob({
      title: 'job test',
      description: 'job descr',
      link: 'job link',
      start: new Date().getTime(),
    })
    const skill = await skillsRepository.getSkillByTitle('test')
    const job = await jobsRepository.getJobByTitle('job test')
    const skillOnJob: SkillOnJob = {
      skillId: skill?.id ?? 0,
      jobId: job?.id ?? 0
    }
    await skillsOnJobsRepository.createSkillOnJob(skillOnJob)

    await expect(skillsOnJobsRepository.updateSkillOnJob(skillOnJob, skillOnJob))
      .rejects.toThrowError('Relation between skill and job already exists.')
  })

  test('DELETE Method', async () => {
    await skillsRepository.createSkill({
      title: 'test',
    })
    await jobsRepository.createJob({
      title: 'job test',
      description: 'job descr',
      link: 'job link',
      start: new Date().getTime(),
    })
    const skill = await skillsRepository.getSkillByTitle('test')
    const job = await jobsRepository.getJobByTitle('job test')
    const skillOnJob: SkillOnJob = {
      skillId: skill?.id ?? 0,
      jobId: job?.id ?? 0
    }
    await skillsOnJobsRepository.createSkillOnJob(skillOnJob)
    await skillsOnJobsRepository.deleteSkillOnJob(skillOnJob)
    const actual = await db.oneOrNone(
      'select * from skills_jobs where skill_id = $1 and job_id = $2',
      [
        skillOnJob.skillId,
        skillOnJob.jobId
      ]
    )

    expect(actual).toBeNull()
  })

})