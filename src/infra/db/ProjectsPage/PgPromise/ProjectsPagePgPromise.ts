import ProjectsPage from "@/domain/entities/ProjectsPage";
import { IProjectsPage, ProjectsPageIn } from "@/domain/repository/IProjectsPage";
import db from "./db";

export default class ProjectsPagePgPromise implements IProjectsPage {
  async createProjectsPage(page: ProjectsPageIn): Promise<void> {
    await db.none(
      `insert into projects_page (
        title, description
      ) values ($1,$2);`,
      [
        page.title,
        page.description
      ],
    );
  }

  async getProjectsPage(): Promise<ProjectsPage> {
    const page = await db.oneOrNone('select * from projects_page;')
    return page ?? {}
  }

  async updateProjectsPage(page: Partial<ProjectsPageIn>): Promise<void> {
    const query = `update projects_page set ${Object.keys(page).map((key, index) =>
      `${key} = '${Object.values(page)[index]}'`)
      };`
    await db.none(query);
  }

  async deleteProjectsPage(): Promise<void> {
    await db.none('delete from projects_page;')
  }

}