import IJobs, { JobIn, JobOut } from "@/domain/repository/IJobs";
import db from "./db";

export default class JobsPgPromise implements IJobs {
  async createJob(job: JobIn): Promise<void> {
    const start = new Date(new Date(job.start).toDateString())
    const end = job.end && new Date(new Date(job.end).toDateString())
    await db.none(
      `insert into jobs (
        title, description, link, start${job.end ? `, "end"` : ''}
    ) values ($1,$2,$3,$4${job.end ? `,$5` : ''});`,
      [
        job.title,
        job.description,
        job.link,
        start,
        end
      ],
    );
  }

  async getJobs(): Promise<JobOut[]> {
    const jobs = await db.manyOrNone('select * from jobs;')
    return jobs.map(job => ({
      ...job,
      start: new Date(new Date(job.start).toDateString()).getTime(),
      end: new Date(new Date(job.end).toDateString()).getTime(),
    }))
  }

  async updateJob(id: number, job: Partial<JobIn>): Promise<void> {
    const query = `update jobs set ${Object.keys(job).map((key, index) =>
      `${key} = '${Object.values(job)[index]}'`)
      } where id = ${id}`
    await db.none(query);
  }

  async deleteJob(id: number): Promise<void> {
    await db.none('delete from jobs where id = $1', id)
  }
}