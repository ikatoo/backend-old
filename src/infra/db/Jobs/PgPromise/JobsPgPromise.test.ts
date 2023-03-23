import { afterEach, beforeAll, describe, expect, test } from "vitest";
import db from "./db";
import JobsPgPromise from "./JobsPgPromise";

describe("Basic operations in Jobs Postgres Database", () => {
  const repository = new JobsPgPromise();

  afterEach(async () => {
    await db.none("delete from jobs;");
  });

  test("CREATE and READ Method", async () => {
    const now = new Date(new Date().toDateString()).getTime()
    const jobMock = {
      title: "skill1",
      description: "desc skill 1",
      link: 'link1',
      start: now,
      end: now
    };
    await repository.createJob(jobMock);
    const jobInDb = await db.one(
      "select * from jobs where title = $1",
      jobMock.title,
    );
    const expected = [{ id: jobInDb.id, ...jobMock }];
    const actual = await repository.getJobs();

    expect(expected).toEqual(actual);
  });

  test("UPDATE Method", async () => {
    const now = new Date(new Date().toDateString()).getTime()
    const jobMock = {
      title: "skill1",
      description: "desc skill 1",
      link: 'link1',
      start: now,
      end: now
    };
    await repository.createJob(jobMock);
    const jobInDb = await db.one(
      "select * from jobs where title = $1",
      jobMock.title,
    );
    const newValue = {
      description: "new description",
    };
    await repository.updateJob(jobInDb.id, newValue);
    const expected = [{ id: jobInDb.id, ...jobMock, ...newValue }];
    const actual = await repository.getJobs();

    expect(expected).toEqual(actual);
  });

  test("DELETE Method", async () => {
    const now = new Date(new Date().toDateString()).getTime()
    const jobMock = {
      title: "skill1",
      description: "desc skill 1",
      link: 'link1',
      start: now,
      end: now
    };
    await repository.createJob(jobMock);
    const jobInDb = await db.one(
      "select * from jobs where title = $1",
      jobMock.title,
    );
    await repository.deleteJob(jobInDb.id);
    const expected: [] = [];
    const actual = await repository.getJobs();

    expect(expected).toEqual(actual);
  });
});