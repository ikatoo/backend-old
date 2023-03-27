import Project from "../entities/Project";

export type ProjectIn = Omit<Project, 'id'>

export default interface IProjects {
  createProject(project: ProjectIn): Promise<void>;
  getProjects(): Promise<Project[]>;
  updateProject(id: number, project: Partial<ProjectIn>): Promise<void>;
  deleteProject(id: number): Promise<void>;
  clear(): Promise<void>
}