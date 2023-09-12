import IProjects, { PartialProject, Project, ProjectWithId } from "@/repository/IProject";
import { dateToString, stringToDate } from "@/utils/transformers/dateTransform";
import db from "..";

export default class ProjectsPgPromise implements IProjects {
  async getProjectById(id: number): Promise<ProjectWithId | undefined> {
    const project = await db.oneOrNone(
      'select * from projects where id=$1',
      id
    )
    if (!project) return

    const mappedProject: ProjectWithId = {
      id: project.id,
      description: {
        title: project.title,
        content: project.description,
        subTitle: `Last update: ${dateToString(project.last_update)}`
      },
      githubLink: project.github_link,
      snapshot: project.snapshot
    }

    return mappedProject
  }

  async getProjectsByPartialTitle(title: string): Promise<ProjectWithId[] | undefined> {
    const projects = await db.manyOrNone(
      `select * from projects where title ilike '%$1:value%'`,
      title
    )
    if (!projects.length) return

    const mappedProject: ProjectWithId[] = projects.map(project => ({
      id: project.id,
      description: {
        title: project.title,
        content: project.description,
        subTitle: `Last update: ${dateToString(project.last_update)}`
      },
      githubLink: project.github_link,
      snapshot: project.snapshot
    })
    )

    return mappedProject
  }

  async clear(): Promise<void> {
    await db.none('delete from projects;')
  }

  async createProject(project: Project): Promise<void> {
    await db.none(
      'insert into projects (title, description, snapshot, github_link, last_update) values ($1,$2,$3,$4,$5);',
      [
        project.description.title,
        project.description.content,
        project.snapshot,
        project.githubLink,
        stringToDate(project.description.subTitle)
      ]
    );
  }

  async getProjects(): Promise<ProjectWithId[]> {
    const projects = await db.manyOrNone('select * from projects;')
    return projects.map(project => ({
      id: project.id,
      description: {
        title: project.title,
        content: project.description,
        subTitle: `Last update: ${dateToString(project.last_update)}`
      },
      githubLink: project.github_link,
      snapshot: project.snapshot
    }))
  }

  async updateProject(id: number, project: PartialProject): Promise<void> {
    const { description, githubLink, snapshot } = project
    const lastUpdate = description?.subTitle?.split(': ')[1]
    const values = [
      !!githubLink ? `github_link='${githubLink}'` : '',
      !!snapshot ? `snapshot='${snapshot}'` : '',
      !!description?.title ? `title='${description?.title}'` : '',
      !!description?.content ? `description='${description?.content}'` : '',
      !!lastUpdate ? `last_update='${stringToDate(lastUpdate ?? '').toISOString()}'` : ''
    ].filter(item => item !== '').toString()

    await db.none(
      'update projects set $1:raw where id = $2',
      [values, id]
    )
  }

  async deleteProject(id: number): Promise<void> {
    await db.none('delete from projects where id = $1', id)
  }

}