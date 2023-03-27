import ISkills, { SkillIn, SkillOut } from "@/domain/repository/ISkills";
import db from "./db";

export default class SkillsPgPromise implements ISkills {

  async clear(): Promise<void> {
    await db.none('delete from skills;')
  }

  async createSkill(skill: SkillIn): Promise<void> {
    await db.none(
      `insert into skills (
      title, description, about_page_id
    ) values ($1,$2, $3);`,
      [
        skill.title,
        skill.description,
        skill.aboutPageId
      ],
    );
  }

  async getSkills(): Promise<SkillOut[]> {
    const skills = await db.manyOrNone("select * from skills;");
    const mappedSkills: SkillOut[] = skills.map(skill => ({
      id: skill.id,
      title: skill.title,
      description: skill.description,
      aboutPageId: skill.about_page_id
    }))
    return [...mappedSkills];
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

  async getSkillsByAboutPageId(aboutPageId: number): Promise<SkillOut[]> {
    const skills = await db.manyOrNone(
      "select * from skills where about_page_id = $1;",
      aboutPageId
    );
    const mappedSkills: SkillOut[] = skills.map(skill => ({
      id: skill.id,
      title: skill.title,
      description: skill.description,
      aboutPageId: skill.about_page_id
    }))
    return [...mappedSkills];
  }
}
