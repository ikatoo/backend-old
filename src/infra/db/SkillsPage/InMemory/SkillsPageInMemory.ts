import SkillsPage from "@/domain/entities/SkillsPage";
import ISkillsPage from "@/domain/repository/ISkillsPage";

let skillsPage: SkillsPage[] = [];

export default class SkillsPageInMemory implements ISkillsPage {
  async createSkillsPage(page: SkillsPage): Promise<void> {
    skillsPage = [page];
  }

  async getSkillsPage(): Promise<SkillsPage> {
    return skillsPage[0];
  }

  async updateSkillsPage(page: Partial<SkillsPage>): Promise<void> {
    skillsPage = [{ ...skillsPage[0], ...page }];
  }

  async deleteSkillsPage(): Promise<void> {
    skillsPage = [];
  }
}
