import ISkills, { SkillIn, SkillOut } from "@/domain/repository/ISkills";
import { QueryParam } from "pg-promise";
import db from "../db";

export default class SkillsPgPromise implements ISkills {
  async createSkill(skill: SkillIn): Promise<void> {
    await db.none(
      `insert into skills (
      title, description
    ) values ($1,$2);`,
      [
        skill.title,
        skill.description,
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
