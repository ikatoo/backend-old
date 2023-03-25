import { JobsRepository } from "@/infra/db/Jobs";
import { SkillsPageRepository } from "@/infra/db/SkillsPage";

async function getSkillsPageHandler() {
  const skillsRepository = new SkillsPageRepository();
  const jobsRepository = new JobsRepository()
  
  const lastJobs = await jobsRepository.getJobs()

  const skillsPage = await skillsRepository.getSkillsPage()

  return {
    ...skillsPage,
    lastJobs
  }
}

export { getSkillsPageHandler };
