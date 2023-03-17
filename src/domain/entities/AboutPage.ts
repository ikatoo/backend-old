type Skill = {
  title: string
}

export default class AboutPage {
  constructor(
    readonly title: string,
    readonly description: string,
    readonly skills: Skill[],
    readonly illustrationURL?: string,
    readonly illustrationALT?: string,
  ) {}
}