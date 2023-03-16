import Job from "./Job";

export default class Skill {
  constructor(
    readonly id: number,
    readonly title: string,
    readonly description?: string,
  ) {}

  monthsExperienceCalculator(jobs: Job[]): number {
    let totalMonthsExperience = 0;
    jobs.forEach((job) => {
      const skillExists = job.skills.find((skill) =>
        skill.title === this.title
      );
      if (skillExists) {
        totalMonthsExperience += ((job.end ?? Date.now()) - job.start) / 1000 /
          60 / 60 / 24 / 30;
      }
    });

    return parseInt(totalMonthsExperience.toFixed(0));
  }
}
