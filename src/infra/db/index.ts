import db from "./PgPromise"
import AboutPagePgPromise from "./PgPromise/AboutPage/AboutPagePgPromise"
import ContactPagePgPromise from "./PgPromise/ContactPage/ContactPagePgPromise"
import ProjectsPgPromise from "./PgPromise/Projects/ProjectsPgPromise"
import SkillsPagePgPromise from "./PgPromise/SkillsPage/SkillsPagePgPromise"

const initDB = () => {
  console.log('INIT DATABASE...')
  db
}

export {
  AboutPagePgPromise as AboutPageRepository,
  SkillsPagePgPromise as SkillsPageRepository,
  ContactPagePgPromise as ContactPageRepository,
  ProjectsPgPromise as ProjectsRepository,
  initDB
}
