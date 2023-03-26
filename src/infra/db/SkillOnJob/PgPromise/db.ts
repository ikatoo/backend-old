import pgPromise from "../../pgPromise";

const db = pgPromise

db.none(`create table if not exists skills_jobs (
  job_id int not null,
  skill_id int not null
);`);

export default db