import { AboutPageRepository } from "@/infra/db/AboutPage";
import { SkillsRepository } from "@/infra/db/Skills";

const aboutPageRepository = new AboutPageRepository();
const skillsRepository = new SkillsRepository()

async function getAboutPageHandler() {
  const aboutPage = await aboutPageRepository.getAboutPage()
  const skills = await skillsRepository.getSkillsByAboutPageId(aboutPage.id)
  const mappedSkills = skills.map(skill => ({ title: skill.title }))

  return { ...aboutPage, skills: mappedSkills }
}

export { getAboutPageHandler };
