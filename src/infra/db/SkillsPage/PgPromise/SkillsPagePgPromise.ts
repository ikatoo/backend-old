import ISkillsPage, { SkillsPageIn, SkillsPageOut } from "@/domain/repository/ISkillsPage";
import db from "./db";

export default class SkillsPagePgPromise implements ISkillsPage {
  async createSkillsPage(page: SkillsPageIn): Promise<void> {
    await db.none(
      `insert into skills_page (
      title, description
    ) values ($1,$2);`,
      [
        page.title,
        page.description
      ],
    );
  }

  async getSkillsPage(): Promise<SkillsPageOut> {
    const page = await db.manyOrNone('select * from skills_page;')
    return page ? page[0] : {}
  }

  async updateSkillsPage(page: Partial<SkillsPageIn>): Promise<void> {
    const query = `update skills_page set ${Object.keys(page).map((key, index) =>
      `${key} = '${Object.values(page)[index]}'`)
      };`
    await db.none(query);
  }

  async deleteSkillsPage(): Promise<void> {
    await db.none('delete from skills_page;')
  }
}
