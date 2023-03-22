import { JobsRepository } from "@/infra/db/Jobs";
import { SkillsPageRepository } from "@/infra/db/SkillsPage";
import { Request, ResponseToolkit } from "@hapi/hapi";
import { notfoundResponse } from "hapi/routes/notFoundResponse";

async function getSkillsPageHandler(_request?: Request, h?: ResponseToolkit) {
  const skillsRepository = new SkillsPageRepository();
  const jobsRepository = new JobsRepository()
  const lastJobs = await jobsRepository.getJobs()

  const skillsPage = await skillsRepository.getSkillsPage() ?? (!!h && notfoundResponse(h));

  return {
    ...skillsPage,
    lastJobs
  }
}

export { getSkillsPageHandler };
