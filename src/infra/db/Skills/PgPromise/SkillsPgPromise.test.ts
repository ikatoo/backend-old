import { SkillIn } from "@/domain/repository/ISkills";
import aboutPageMock from "@/mock/aboutPageMock";
import { afterEach, beforeAll, describe, expect, test } from "vitest";
import { AboutPageRepository } from "../../AboutPage";
import db from "./db";
import SkillsPgPromise from "./SkillsPgPromise";

describe("Basic operations in Skills Postgres Database", () => {
  const skillsRepository = new SkillsPgPromise();
  const aboutPageRepository = new AboutPageRepository()

  afterEach(async () => {
    await db.none('delete from about_page;')
    await db.none("delete from skills;");
  });

  test("CREATE Method", async () => {
    await aboutPageRepository.createAboutPage(aboutPageMock)
    const aboutPage = await aboutPageRepository.getAboutPage()
    const skillMock = {
      title: "skill1",
      description: "desc skill 1",
      aboutPageId: aboutPage.id
    };

    await expect(skillsRepository.createSkill(skillMock))
      .resolves.not.toThrow()
  })

  test("READ Method", async () => {
    await aboutPageRepository.createAboutPage(aboutPageMock)
    const aboutPage = await aboutPageRepository.getAboutPage()
    const skillMock = {
      title: "skill1",
      description: "desc skill 1",
      aboutPageId: aboutPage.id
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
      aboutPageId: aboutPage.id
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
      aboutPageId: aboutPage.id
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

  test("Get skills by about_page_id", async () => {
    let expected: SkillIn[] = []
    for (let index = 0; index < 4; index++) {
      const skill: SkillIn = {
        title: `title ${index}`,
        description: `description ${index}`,
        aboutPageId: index < 3 ? 1 : index
      }
      expected = index < 3 ? [...expected, skill] : expected
      await skillsRepository.createSkill(skill);
    }

    const actual = (await skillsRepository.getSkillsByAboutPageId(1)).map(skill => {
      const { id, ...rest } = skill
      return rest
    })

    expect(expected).toEqual(actual);
  });
});
