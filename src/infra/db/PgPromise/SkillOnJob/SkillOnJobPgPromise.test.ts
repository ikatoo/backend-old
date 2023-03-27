import { randomInt } from "crypto";
import { beforeEach, describe, expect, test } from "vitest";
import db from "..";
import SkillOnJobPgPromise from "./SkillOnJobPgPromise";

describe('Basic operations in Skills_Jobs PgPromise Database', () => {
  const skillsOnJobsRepository = new SkillOnJobPgPromise()

  beforeEach(() => {
    db.none('delete from skills_jobs;')
  })

  test('CREATE Method', async () => {
    const skillOnJobMock = {
      skillId: randomInt(1, 10),
      jobId: randomInt(1, 10)
    }

    await expect(skillsOnJobsRepository.createSkillOnJob(skillOnJobMock))
      .resolves.not.toThrow()
  })

  test('READ Method', async () => {
    const skillOnJobMock = {
      skillId: randomInt(1, 10),
      jobId: randomInt(1, 10)
    }
    await skillsOnJobsRepository.createSkillOnJob(skillOnJobMock)
    const expected = [skillOnJobMock]
    const actual = await skillsOnJobsRepository.getJobsBySkillId(skillOnJobMock.skillId)

    expect(expected).toEqual(actual)
  })

  test('UPDATE Method', async () => {
    const oldValue = {
      skillId: randomInt(1, 10),
      jobId: randomInt(1, 10)
    }
    await skillsOnJobsRepository.createSkillOnJob(oldValue)

    const newValue = {
      skillId: randomInt(1, 10),
      jobId: randomInt(1, 10)
    }
    await skillsOnJobsRepository.updateSkillOnJob(oldValue, newValue)
  })

  test('NOT update with existent value', async () => {
    const skillOnJob = {
      skillId: randomInt(1, 10),
      jobId: randomInt(1, 10)
    }
    await skillsOnJobsRepository.createSkillOnJob(skillOnJob)

    await expect(skillsOnJobsRepository.updateSkillOnJob(skillOnJob, skillOnJob))
      .rejects.toThrowError('Relation between skill and job already exists.')
  })

  test('DELETE Method', async () => {
    const skillOnJob = {
      skillId: randomInt(1, 10),
      jobId: randomInt(1, 10)
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