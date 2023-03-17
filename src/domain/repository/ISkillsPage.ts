import SkillsPage from "../entities/SkillsPage";

export default interface ISkillsPage {
  createSkillsPage(page: SkillsPage): Promise<void>;
  getSkillsPage(): Promise<SkillsPage>;
  updateSkillsPage(page: Partial<SkillsPage>): Promise<void>;
  deleteSkillsPage(): Promise<void>;
}
