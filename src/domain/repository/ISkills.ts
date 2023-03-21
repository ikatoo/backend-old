export type SkillIn = {
  title: string;
  description?: string;
};

export type SkillOut = SkillIn & { id: number };

export default interface ISkills {
  createSkill(skill: SkillIn): Promise<void>;
  getSkills(): Promise<SkillOut[]>;
  updateSkills(id: number, skill: Partial<SkillIn>): Promise<void>;
  deleteSkill(id: number): Promise<void>;
}
