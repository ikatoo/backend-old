import { JobsRepository } from "@/infra/db";
import { SkillOnJobRepository } from "@/infra/db";
import { SkillsRepository } from "@/infra/db";
import { SkillsPageRepository } from "@/infra/db";
import skillPageMock from "@/mock/skillPageMock";
import { dateStringToNumber, dateToNumber } from "@/utils/transformers/dateTransform";
import { afterEach, describe, expect, test } from "vitest";
import { getSkillsPageHandler } from "./skillsPageController";

describe("SkillsPage Controller test", () => {
  const skillsPageRepository = new SkillsPageRepository()
  const jobsRepository = new JobsRepository()
  const skillsRepository = new SkillsRepository()
  const skillOnJobRepository = new SkillOnJobRepository()

  afterEach(async () => {
    await skillsPageRepository.clear()
    await jobsRepository.clear()
    await skillsRepository.clear()
    await skillOnJobRepository.clear()
  })

  test.skip("Get skills page data", async () => {
    await skillsPageRepository.createSkillsPage(skillPageMock);
    for (const skill of skillPageMock.skills) {
      await skillsRepository.createSkill({
        title: skill.skillTitle
      })
    }
    for (const job of skillPageMock.lastJobs) {
      await jobsRepository.createJob({
        title: job.jobTitle,
        description: job.jobDescription,
        link: job.link,
        start: dateStringToNumber(job.yearMonthStart),
        end: job.yearMonthEnd ? dateStringToNumber(job.yearMonthEnd) : dateToNumber(new Date())
      })
    }

    const result = await getSkillsPageHandler();
    const expected = skillPageMock

    expect(expected).toEqual(result);
  });
});
