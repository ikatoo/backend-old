import ISkillsPage, { SkillsPageIn, SkillsPageOut } from "@/domain/repository/ISkillsPage";
import { randomInt } from "crypto";

let skillsPage: SkillsPageOut[] = [];

export default class SkillsPageInMemory implements ISkillsPage {
  async createSkillsPage(page: SkillsPageIn): Promise<void> {
    skillsPage = [{ id: randomInt(1, 2000), ...page }];
  }

  async getSkillsPage(): Promise<SkillsPageOut> {
    return skillsPage[0];
  }

  async updateSkillsPage(page: Partial<SkillsPageIn>): Promise<void> {
    skillsPage = [{ ...skillsPage[0], ...page }];
  }

  async deleteSkillsPage(): Promise<void> {
    skillsPage = [];
  }
}
