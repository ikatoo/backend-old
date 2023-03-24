import { describe, expect, test } from "vitest";
import Job from "./Job";
import Skill from "./Skill";

describe("Weeks amounts experience calculator", () => {
  test("Should calculate amount of the experience", () => {
    const skillToCalculate = new Skill(
      1,
      "typescript",
      "object oriented programing",
    );
    const jobs = [
      new Job(
        1,
        "title1",
        "desc1",
        [skillToCalculate, new Skill(2, "other skill 2")],
        "http://github.com/user",
        new Date(2013, 1),
        new Date(2013, 4),
      ),
      new Job(
        2,
        "title2",
        "desc2",
        [new Skill(3, "other skill 3"), new Skill(4, "other skill 4")],
        "http://github.com/user",
        new Date(2013, 5),
        new Date(2021, 5),
      ),
      new Job(
        3,
        "title3",
        "desc3",
        [skillToCalculate],
        "http://github.com/user",
        new Date(2021, 6),
      ),
    ];

    const result = skillToCalculate.monthsExperienceCalculator(jobs);
    const expected = 3 + 12 + 9;

    expect(result).toBe(expected);
  });
});
