export default class Project {
  constructor(
    readonly id: string,
    readonly snapshot: string,
    readonly title: string,
    readonly lastUpdate: Date,
    readonly description: string,
    readonly githubLink: string
  ) {}
}