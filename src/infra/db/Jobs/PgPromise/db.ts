import pgPromise from "../../pgPromise";

const db = pgPromise

db.none(`create table if not exists jobs (
  id int primary key generated by default as identity,
  title varchar(150) not null,
  description text not null,
  link varchar(150) not null,
  start date not null,
  "end" date not null default current_date
);`);

export default db