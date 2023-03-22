import Project from "../entities/Project";

export type ProjectIn = Omit<Project, 'id'>

export default interface IProjects {
  createProject(job: ProjectIn): Promise<void>;
  getProjects(): Promise<Project[]>;
  updateProject(id: number, job: Partial<ProjectIn>): Promise<void>;
  deleteProject(id: number): Promise<void>;
}