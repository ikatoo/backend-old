import ISkillsPage, { SkillsPage } from "@/repository/ISkillsPage";
import { getFieldsWithValues } from "@/utils/transformers/getFieldsWithValues";
import db from "..";

export default class SkillsPagePgPromise implements ISkillsPage {

  async clear(): Promise<void> {
    await db.none('delete from skills_page;')
  }

  async createSkillsPage(page: SkillsPage): Promise<void> {
    await db.none(
      'insert into skills_page (title, description, skills, last_jobs) values ($1,$2,$3,$4);',
      [
        page.title,
        page.description,
        JSON.stringify(page.skills),
        JSON.stringify(page.lastJobs)
      ],
    );
  }

  async getSkillsPage(): Promise<SkillsPage | undefined> {
    const page = await db.oneOrNone('select * from skills_page;')
    if (!page) return
    const mappedPage = {
      title: page.title,
      description: page.description,
      skills: page.skills,
      lastJobs: page.last_jobs
    }
    return mappedPage
  }

  async updateSkillsPage(page: Partial<SkillsPage>): Promise<void> {
    const fieldsWithValues = getFieldsWithValues<SkillsPage>(page)

    await db.none(
      'update skills_page set $1:raw;',
      fieldsWithValues.toString()
    );
  }

  async deleteSkillsPage(): Promise<void> {
    await db.none('delete from skills_page;')
  }
}


