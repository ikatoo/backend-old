create table if not exists about_page (
  title varchar(150) unique not null,
  description text not null,
  skills json,
  illustration_url varchar(200),
  illustration_alt varchar(200)
);

create table if not exists contacts_page (
  title varchar(150) unique not null,
  description text not null,
  localization point
);

create table if not exists projects (
  id int primary key generated by default as identity,
  title varchar(150) unique not null,
  description text not null,
  snapshot varchar(200) not null,
  github_link varchar(150) not null,
  last_update date not null
);

create table if not exists skills_page (
  title varchar(150) unique not null,
  description text not null,
  skills json,
  last_jobs json
);