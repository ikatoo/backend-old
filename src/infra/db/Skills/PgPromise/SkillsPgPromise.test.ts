import { afterEach, beforeAll, describe, expect, test } from "vitest";
import db from "./db";
import SkillsPgPromise from "./SkillsPgPromise";

describe("Basic operations in Skills Postgres Database", () => {
  const repository = new SkillsPgPromise();

  beforeAll(async () => {
    await db.connect();
  });

  afterEach(async () => {
    await db.none("delete from skills;");
  });

  test("CREATE and READ Method", async () => {
    const skillMock = {
      title: "skill1",
      description: "desc skill 1",
    };
    await repository.createSkill(skillMock);
    const skillInDb = await db.one(
      "select * from skills where title = $1",
      skillMock.title,
    );
    const expected = [{ id: skillInDb.id, ...skillMock }];
    const actual = await repository.getSkills();

    expect(expected).toEqual(actual);
  });

  test("UPDATE Method", async () => {
    const skillMock = {
      title: "update test",
      description: "desc update test",
    };
    await repository.createSkill(skillMock);
    const skillInDb = await db.one(
      "select * from skills where title = $1",
      skillMock.title,
    );
    const newValue = {
      description: "new description",
    };
    await repository.updateSkills(skillInDb.id, newValue);
    const expected = [{ id: skillInDb.id, ...skillMock, ...newValue }];
    const actual = await repository.getSkills();

    expect(expected).toEqual(actual);
  });

  test("DELETE Method", async () => {
    const skillMock = {
      title: "update test",
      description: "desc update test",
    };
    await repository.createSkill(skillMock);
    const skillInDb = await db.one(
      "select * from skills where title = $1",
      skillMock.title,
    );
    await repository.deleteSkill(skillInDb.id);
    const expected: [] = [];
    const actual = await repository.getSkills();

    expect(expected).toEqual(actual);
  });
});
