import { ProjectsRepository } from "@/infra/db";
import { PartialProjectSchema, ProjectSchema } from "@/repository/IProject";
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

async function getProjectsByTitleHandler(handlerProps?: HandlerProps): ControllerResponse {
  if (!Object.keys(handlerProps?.parameters!).length) return {
    statusCode: 400
  }
  const title = (handlerProps?.parameters as { title: string }).title
  if (!title)
    throw new ConflictError('Invalid type')

  const projects = await projectsRepository.getProjectsByTitle(title)
  if (!projects || !projects.length) {
    return { statusCode: 204 }
  }

  return {
    body: projects,
    statusCode: 200
  }
}

async function getProjectByIDHandler(handlerProps?: HandlerProps): ControllerResponse {
  const { id } = (handlerProps?.parameters as { id: string })
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

async function createProjectHandler(handlerProps?: HandlerProps): ControllerResponse {
  if (!Object.keys(handlerProps?.parameters!).length) return {
    statusCode: 400
  }

  const validPage = ProjectSchema.safeParse(handlerProps?.parameters)
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

async function updateProjectHandler(handlerProps?: HandlerProps): ControllerResponse {
  const { id } = (handlerProps?.parameters as { id: string })
  if (Object.keys(handlerProps?.parameters!).length < 2 || !+id) return {
    statusCode: 400
  }

  const validPage = PartialProjectSchema.safeParse(handlerProps?.parameters)
  if (!validPage.success || !Object.keys(validPage.data).length)
    throw new ConflictError('Invalid type')
  await projectsRepository.updateProject(+id, validPage.data)

  return { statusCode: 204 }
}

async function deleteProjectHandler(handlerProps?: HandlerProps): ControllerResponse {
  const id = Object.values(handlerProps?.parameters!)[0]
  if (!+id) return {
    statusCode: 400
  }

  await projectsRepository.deleteProject(id)

  return { statusCode: 204 }
}

export {
  createProjectHandler, deleteProjectHandler, getProjectByIDHandler, getProjectsByTitleHandler, getProjectsHandler, updateProjectHandler
};

