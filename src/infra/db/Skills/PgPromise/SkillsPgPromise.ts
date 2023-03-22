import ISkills, { SkillIn, SkillOut } from "@/domain/repository/ISkills";
import { AboutPageRepository } from "../../AboutPage";
import db from "./db";

export default class SkillsPgPromise implements ISkills {
  private readonly aboutPageRepository = new AboutPageRepository()

  async createSkill(skill: SkillIn): Promise<void> {
    const aboutPage = await this.aboutPageRepository.getAboutPage()
    await db.none(
      `insert into skills (
      title, description, about_page_id
    ) values ($1,$2, $3);`,
      [
        skill.title,
        skill.description,
        aboutPage.id
      ],
    );
  }

  async getSkills(): Promise<SkillOut[]> {
    const skills = await db.manyOrNone<SkillOut>("select * from skills;");
    return [...skills];
  }

  async updateSkills(id: number, skill: Partial<SkillIn>): Promise<void> {
    const query = `update skills set ${Object.keys(skill).map((key, index) =>
      `${key} = '${Object.values(skill)[index]}'`)
      } where id = ${id}`
    await db.none(query);
  }

  async deleteSkill(id: number): Promise<void> {
    await db.none(`delete from skills where id = $1`, id);
  }
}
