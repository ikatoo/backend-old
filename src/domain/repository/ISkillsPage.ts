import SkillsPage from "../entities/SkillsPage";

export type SkillsPageIn = Omit<SkillsPage, "id" | "skills" | "lastJobs">
export type SkillsPageOut = Omit<SkillsPage, "skills" | "lastJobs">

export default interface ISkillsPage {
  createSkillsPage(page: SkillsPageIn): Promise<void>;
  getSkillsPage(): Promise<SkillsPageOut>;
  updateSkillsPage(page: Partial<SkillsPageIn>): Promise<void>;
  deleteSkillsPage(): Promise<void>;
}
