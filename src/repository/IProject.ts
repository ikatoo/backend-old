export type Project = {
  id: number
  snapshot: string
  description: {
    title: string
    subTitle: string
    content: string
  },
  githubLink: string
}

export type PartialProject = Partial<{
  snapshot: string
  description: Partial<{
    title: string
    subTitle: string
    content: string
  }>,
  githubLink: string
}>

export type ProjectInput = Omit<Project, "id">

export default interface IProjects {
  createProject(project: ProjectInput): Promise<void>;
  getProjects(): Promise<Project[]>;
  getProjectById(id: number): Promise<Project>;
  getProjectByTitle(title: string): Promise<Project>;
  updateProject(id: number, project: PartialProject): Promise<void>;
  deleteProject(id: number): Promise<void>;
  clear(): Promise<void>
}