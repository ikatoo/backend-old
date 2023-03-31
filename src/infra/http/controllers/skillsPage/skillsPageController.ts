import { SkillsPageRepository } from "@/infra/db";
import { SkillsPage } from "@/repository/ISkillsPage";

const skillsPageRepository = new SkillsPageRepository();

async function getSkillsPageHandler(): Promise<SkillsPage | undefined> {
  const skillsPage = await skillsPageRepository.getSkillsPage()
  if (!skillsPage) return undefined

  return skillsPage
}

export { getSkillsPageHandler };
