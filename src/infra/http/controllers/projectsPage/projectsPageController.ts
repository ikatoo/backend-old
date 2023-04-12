import { ProjectsRepository } from "@/infra/db";
import { PartialProjectSchema, ProjectSchema } from "@/repository/IProject";

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
  if (!Object.keys(handlerProps?.parameters!).length) return {
    statusCode: 400
  }
  const title = (handlerProps?.parameters as { title: string }).title
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

async function getProjectByIDHandler(handlerProps?: HandlerProps): Promise<HandlerResponse> {
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

async function createProjectHandler(handlerProps?: HandlerProps): Promise<HandlerResponse> {
  if (!Object.keys(handlerProps?.parameters!).length) return {
    statusCode: 400
  }

  const validPage = ProjectSchema.safeParse(handlerProps?.parameters)
  if (!validPage.success)
    return {
      error: 'Invalid type.',
      statusCode: 409
    }
  try {
    await projectsRepository.createProject(validPage.data)
    return { statusCode: 201 }
  } catch (error) {
    if (error instanceof Error && error.message.includes('duplicate')) {
      return {
        error: error.message,
        statusCode: 409
      }
    }
    return {
      statusCode: 500
    }
  }
}

async function updateProjectHandler(handlerProps?: HandlerProps): Promise<HandlerResponse> {
  const { id } = (handlerProps?.parameters as { id: string })
  if (Object.keys(handlerProps?.parameters!).length < 2 || !+id) return {
    statusCode: 400
  }

  const validPage = PartialProjectSchema.safeParse(handlerProps?.parameters)
  if (!validPage.success || !Object.keys(validPage.data).length)
    return {
      error: 'Invalid type.',
      statusCode: 409
    }
  try {
    await projectsRepository.updateProject(+id, validPage.data)
    return { statusCode: 204 }
  } catch (error) {
    if (error instanceof Error) {
      return {
        error: error.message,
        statusCode: 409
      }
    }
    return {
      statusCode: 500
    }
  }
}

async function deleteProjectHandler(handlerProps?: HandlerProps): Promise<HandlerResponse> {
  const id = Object.values(handlerProps?.parameters!)[0]
  if (!+id) return {
    statusCode: 400
  }

  try {
    await projectsRepository.deleteProject(id)
    return { statusCode: 204 }
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : undefined,
      statusCode: 204
    }
  }
}

export {
  createProjectHandler, deleteProjectHandler, getProjectByIDHandler, getProjectsByTitleHandler, getProjectsHandler, updateProjectHandler
};

