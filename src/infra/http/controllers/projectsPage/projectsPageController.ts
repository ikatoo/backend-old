import { ProjectsRepository } from "@/infra/db";
import { PartialProject, Project, ProjectWithId } from "@/repository/IProject";

const projectsRepository = new ProjectsRepository();

async function getProjectsHandler(): Promise<ProjectWithId[]> {
  const projects = await projectsRepository.getProjects()
  return projects
}

async function getProjectsByTitleHandler(title: string): Promise<ProjectWithId[]> {
  const projects = await projectsRepository.getProjectsByTitle(title)
  return projects ?? []
}

async function getProjectByIDHandler(id: number): Promise<ProjectWithId | undefined> {
  const project = await projectsRepository.getProjectById(id)
  return project
}

async function createProjectHandler(project: Project): Promise<void> {
  await projectsRepository.createProject(project)
}

async function updateProjectHandler(id: number, project: PartialProject): Promise<void> {
  await projectsRepository.updateProject(id, project)
}

async function deleteProjectHandler(id: number): Promise<void> {
  await projectsRepository.deleteProject(id)
}

export {
  getProjectsHandler,
  getProjectsByTitleHandler,
  getProjectByIDHandler,
  createProjectHandler,
  updateProjectHandler,
  deleteProjectHandler
};
