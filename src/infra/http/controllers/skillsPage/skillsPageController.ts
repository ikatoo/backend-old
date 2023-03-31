import { SkillsPageRepository } from "@/infra/db";
import { SkillsPage } from "@/repository/ISkillsPage";

const skillsPageRepository = new SkillsPageRepository();

async function getSkillsPageHandler(): Promise<SkillsPage | undefined> {
  const skillsPage = await skillsPageRepository.getSkillsPage()
  if (!skillsPage) return undefined

  return skillsPage
}

async function createSkillsPageHandler(page: SkillsPage): Promise<void> {
  await skillsPageRepository.createSkillsPage(page)
}

async function upadteSkillsPageHandler(page: Partial<SkillsPage>): Promise<void> {
  await skillsPageRepository.updateSkillsPage(page)
}

export {
  getSkillsPageHandler,
  createSkillsPageHandler,
  upadteSkillsPageHandler
};
