import { ProjectsRepository } from "@/infra/db";
import { PartialProject, Project, ProjectWithId } from "@/repository/IProject";

const projectsRepository = new ProjectsRepository();

async function getProjectsHandler(): Promise<ProjectWithId[]> {
  const contacts = await projectsRepository.getProjects()
  return [...contacts]
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
  createProjectHandler,
  updateProjectHandler,
  deleteProjectHandler
};
