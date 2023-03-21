import Skill from "./Skill";

export default class Job {
  constructor(
    readonly id: number,
    readonly title: string,
    readonly description: string,
    readonly skills: Skill[],
    readonly link: string,
    readonly start: number,
    readonly end?: number,
  ) {}
}
