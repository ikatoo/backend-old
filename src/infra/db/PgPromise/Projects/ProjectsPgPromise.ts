import IProjects, { PartialProject, Project, ProjectInput } from "@/repository/IProject";
import { dateToString, stringToDate } from "@/utils/transformers/dateTransform";
import db from "..";

export default class ProjectsPgPromise implements IProjects {
  async getProjectById(id: number): Promise<Project | undefined> {
    const project = await db.oneOrNone(
      'select * from projects where id=$1',
      id
    )
    if (!project) return

    const mappedProject: Project = {
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

  async getProjectByTitle(title: string): Promise<Project | undefined> {
    const project = await db.oneOrNone(
      'select * from projects where title=$1',
      title
    )
    if (!project) return

    const mappedProject: Project = {
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

  async clear(): Promise<void> {
    await db.none('delete from projects;')
  }

  async createProject(project: ProjectInput): Promise<void> {
    await db.none(
      `insert into projects (
        title, description, snapshot, github_link, last_update
      ) values ($1,$2,$3,$4,$5);`,
      [
        project.description.title,
        project.description.content,
        project.snapshot,
        project.githubLink,
        stringToDate(project.description.subTitle)
      ],
    );
  }

  async getProjects(): Promise<Project[]> {
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
    await db.none(
      `update projects set 
      ${project.description?.title ? 'title=$2' : ''} 
      ${project.description?.content ? ',description=$3' : ''} 
      ${project.snapshot ? ',snapshot=$4' : ''} 
      ${project.githubLink ? ',github_link=$5' : ''} 
      ${project.description?.subTitle ? ',last_update =$6' : ''} 
       where id = $1`,
      [
        id,
        project.description?.title,
        project.description?.content,
        project.snapshot,
        project.githubLink,
        project.description?.subTitle ? stringToDate(project.description.subTitle) : undefined
      ]);
  }

  async deleteProject(id: number): Promise<void> {
    await db.none('delete from projects where id = $1', id)
  }

}