export type JobIn = {
  title: string
  description: string
  link: string
  start: number
  end?: number
};

export type JobOut = JobIn & { id: number };

export default interface IJobs {
  createJob(job: JobIn): Promise<void>;
  getJobs(): Promise<JobOut[]>;
  getJobByTitle(title: string): Promise<JobOut | undefined>
  updateJob(id: number, job: Partial<JobIn>): Promise<void>;
  deleteJob(id: number): Promise<void>;
  clear(): Promise<void>
}
