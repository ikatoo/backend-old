import { ProjectsRepository } from "@/infra/db";
import { PartialProject, PartialProjectSchema, Project, ProjectSchema, ProjectWithId } from "@/repository/IProject";
import { ConflictError, InternalError } from "@/utils/httpErrors";

const projectsRepository = new ProjectsRepository();

async function getProjectsHandler(): ControllerResponse {
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
  } catch {
    throw new InternalError()
  }
}

async function getProjectsByTitleHandler(handlerProps?: HandlerProps<{ title: string }>): ControllerResponse {
  const partialTitle = handlerProps?.parameters?.data?.title

  if (!partialTitle) return {
    statusCode: 400
  }

  const projects = await projectsRepository.getProjectsByPartialTitle(partialTitle)

  return {
    body: projects,
    statusCode: 200
  }
}

async function getProjectByIDHandler(handlerProps?: HandlerProps<{ id: number }>): ControllerResponse {
  const id = handlerProps?.parameters?.data?.id
  if (!id) return {
    statusCode: 400
  }
  const project = await projectsRepository.getProjectById(+id)
  if (!project) {
    return { statusCode: 404 }
  }
  return {
    body: project,
    statusCode: 200
  }
}

async function createProjectHandler(handlerProps?: HandlerProps<Project>): ControllerResponse {
  const project = handlerProps?.parameters?.data
  if (!project || !Object.keys(project).length) return {
    statusCode: 400
  }

  const validPage = ProjectSchema.safeParse(project)
  if (!validPage.success)
    throw new ConflictError('Invalid type')
  try {
    await projectsRepository.createProject(validPage.data)
    return { statusCode: 201 }
  } catch (error) {
    if (error instanceof Error && error.message.includes('duplicate'))
      throw new ConflictError('Duplicated data.')
  }
}

async function updateProjectHandler(handlerProps?: HandlerProps<PartialProject & { id: number }>): ControllerResponse {
  const project = handlerProps?.parameters?.data
  const id = project?.id
  if (!id || Object.keys(project).length <= 1) return {
    statusCode: 400
  }

  const validPage = PartialProjectSchema.safeParse(project)
  if (!validPage.success || !Object.keys(validPage.data).length)
    throw new ConflictError('Invalid type')
  await projectsRepository.updateProject(+id, validPage.data)

  return { statusCode: 204 }
}

async function deleteProjectHandler(handlerProps?: HandlerProps<{ id: number }>): ControllerResponse {
  const id = handlerProps?.parameters?.data?.id
  if (!id) return {
    statusCode: 400
  }

  await projectsRepository.deleteProject(+id)

  return { statusCode: 204 }
}

export {
  createProjectHandler, deleteProjectHandler, getProjectByIDHandler, getProjectsByTitleHandler, getProjectsHandler, updateProjectHandler
};

