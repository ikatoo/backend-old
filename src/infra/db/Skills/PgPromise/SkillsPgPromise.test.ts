import aboutPageMock from "@/mock/aboutPageMock";
import { afterEach, beforeAll, describe, expect, test } from "vitest";
import { AboutPageRepository } from "../../AboutPage";
import db from "./db";
import SkillsPgPromise from "./SkillsPgPromise";

describe("Basic operations in Skills Postgres Database", () => {
  const skillsRepository = new SkillsPgPromise();
  const aboutPageRepository = new AboutPageRepository()

  beforeAll(async () => {
    await db.connect();
  });

  afterEach(async () => {
    await db.none("delete from skills;");
  });

  test("CREATE and READ Method", async () => {
    await aboutPageRepository.createAboutPage(aboutPageMock)
    const aboutPage = await aboutPageRepository.getAboutPage()
    const skillMock = {
      title: "skill1",
      description: "desc skill 1",
      about_page_id: aboutPage.id
    };
    await skillsRepository.createSkill(skillMock);
    const skillInDb = await db.one(
      "select * from skills where title = $1",
      skillMock.title,
    );
    const expected = [{ id: skillInDb.id, ...skillMock }];
    const actual = await skillsRepository.getSkills();

    expect(expected).toEqual(actual);
  });

  test("UPDATE Method", async () => {
    await aboutPageRepository.createAboutPage(aboutPageMock)
    const aboutPage = await aboutPageRepository.getAboutPage()
    const skillMock = {
      title: "update test",
      description: "desc update test",
      about_page_id: aboutPage.id
    };
    await skillsRepository.createSkill(skillMock);
    const skillInDb = await db.one(
      "select * from skills where title = $1",
      skillMock.title,
    );
    const newValue = {
      description: "new description",
    };
    await skillsRepository.updateSkills(skillInDb.id, newValue);
    const expected = [{ id: skillInDb.id, ...skillMock, ...newValue }];
    const actual = await skillsRepository.getSkills();

    expect(expected).toEqual(actual);
  });

  test("DELETE Method", async () => {
    await aboutPageRepository.createAboutPage(aboutPageMock)
    const aboutPage = await aboutPageRepository.getAboutPage()
    const skillMock = {
      title: "update test",
      description: "desc update test",
      about_page_id: aboutPage.id
    };
    await skillsRepository.createSkill(skillMock);
    const skillInDb = await db.one(
      "select * from skills where title = $1",
      skillMock.title,
    );
    await skillsRepository.deleteSkill(skillInDb.id);
    const expected: [] = [];
    const actual = await skillsRepository.getSkills();

    expect(expected).toEqual(actual);
  });
});
