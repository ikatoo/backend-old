import Project from "@/domain/entities/Project";
import IProjects, { ProjectIn } from "@/domain/repository/IProject";
import db from "./db";

export default class ProjectsPgPromise implements IProjects {
  async createProject(project: ProjectIn): Promise<void> {
    await db.none(
      `insert into projects (
        title, description, snapshot, github_link, last_update
      ) values ($1,$2,$3,$4,$5);`,
      [
        project.title,
        project.description,
        project.snapshot,
        project.githubLink,
        project.lastUpdate
      ],
    );
  }

  async getProjects(): Promise<Project[]> {
    const projects = await db.manyOrNone('select * from projects;')
    return projects.map(project => {
      const { github_link, last_update, ...rest } = project
      return {
        ...rest,
        githubLink: github_link,
        lastUpdate: last_update
      }
    }) ?? [];
  }

  async updateProject(id: number, project: Partial<ProjectIn>): Promise<void> {
    const query = `update projects set ${Object.keys(project).map((key, index) =>
      `${key} = '${Object.values(project)[index]}'`)
      } where id = ${id}`
    await db.none(query);
  }

  async deleteProject(id: number): Promise<void> {
    await db.none('delete from projects where id = $1', id)
  }

}