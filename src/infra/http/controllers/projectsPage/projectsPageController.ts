import { ProjectsRepository } from "@/infra/db";
import { PartialProject, PartialProjectSchema, Project, ProjectWithId } from "@/repository/IProject";

const projectsRepository = new ProjectsRepository();

async function getProjectsHandler(): Promise<HandlerResponse> {
  try {
    const projects = await projectsRepository.getProjects()
    if (!projects.length) {
      return {
        statusCode: 204
      }
    }
    return {
      body: projects,
      statusCode: 200
    }
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : undefined,
      statusCode: 500
    }
  }
}

async function getProjectsByTitleHandler(handlerProps?: HandlerProps): Promise<HandlerResponse> {
  if (!handlerProps?.parameters || !Object.keys(handlerProps.parameters).length) return {
    statusCode: 400
  }
  const title = (handlerProps.parameters as { title: string }).title
  if (!title)
    return {
      error: 'Invalid type',
      statusCode: 409
    }

  try {
    const projects = await projectsRepository.getProjectsByTitle(title)
    if (!projects || !projects.length) {
      return { statusCode: 204 }
    }
    return {
      body: projects,
      statusCode: 200
    }
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : undefined,
      statusCode: 500
    }
  }

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
  createProjectHandler, deleteProjectHandler, getProjectByIDHandler, getProjectsByTitleHandler, getProjectsHandler, updateProjectHandler
};

