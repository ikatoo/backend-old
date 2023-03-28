import ISkillsPage, { SkillsPage } from "@/repository/ISkillsPage";
import { randomInt } from "crypto";

let skillsPage: SkillsPage[] = [];

export default class SkillsPageInMemory implements ISkillsPage {

  async clear(): Promise<void> {
    skillsPage = []
  }

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
