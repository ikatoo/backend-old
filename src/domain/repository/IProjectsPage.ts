import ProjectsPage from "../entities/ProjectsPage";

export type ProjectsPageIn = Omit<ProjectsPage, "id">

export interface IProjectsPage {
  createProjectsPage(page: ProjectsPageIn): Promise<void>;
  getProjectsPage(): Promise<ProjectsPage>;
  updateProjectsPage(page: Partial<ProjectsPageIn>): Promise<void>;
  deleteProjectsPage(): Promise<void>;
}