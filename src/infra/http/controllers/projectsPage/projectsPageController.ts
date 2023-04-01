import { ProjectsRepository } from "@/infra/db";
import { PartialProject, Project, ProjectInput } from "@/repository/IProject";

const projectsRepository = new ProjectsRepository();

async function getProjectsPageHandler(): Promise<Project[]> {
  const contacts = await projectsRepository.getProjects()
  return [...contacts]
}

async function createProjectsPageHandler(project: ProjectInput): Promise<void> {
  await projectsRepository.createProject(project)
}

async function updateProjectsPageHandler(id: number, project: PartialProject): Promise<void> {
  await projectsRepository.updateProject(id, project)
}

async function deleteProjectsPageHandler(id: number): Promise<void> {
  await projectsRepository.deleteProject(id)
}

export {
  getProjectsPageHandler,
  createProjectsPageHandler,
  updateProjectsPageHandler,
  deleteProjectsPageHandler
};
