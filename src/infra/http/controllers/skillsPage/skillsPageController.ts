import { SkillsPageRepository } from "@/infra/db";
import { PartialSkillsPageSchema, SkillsPageSchema } from "@/repository/ISkillsPage";

const skillsPageRepository = new SkillsPageRepository();

async function getSkillsPageHandler(): Promise<HandlerResponse> {
  const pageData = await skillsPageRepository.getSkillsPage()
  if (!pageData) {
    return { statusCode: 204 }
  }
  return {
    body: pageData,
    statusCode: 200
  }
}

async function createSkillsPageHandler(handlerProps?: HandlerProps): Promise<HandlerResponse> {
  if (!Object.keys(handlerProps?.parameters!).length) return {
    statusCode: 400
  }

  const validPage = SkillsPageSchema.safeParse(handlerProps?.parameters)
  if (!validPage.success)
    return {
      error: 'Invalid type.',
      statusCode: 409
    }
  try {
    await skillsPageRepository.createSkillsPage(validPage.data)
    return { statusCode: 201 }
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : undefined,
      statusCode: 409
    }
  }
}

async function updateSkillsPageHandler(handlerProps?: HandlerProps): Promise<HandlerResponse> {
  if (!Object.keys(handlerProps?.parameters!).length) return {
    statusCode: 400
  }

  const validPage = PartialSkillsPageSchema.safeParse(handlerProps?.parameters)
  if (!validPage.success || Object.keys(validPage.data).length === 0)
    return {
      error: 'Invalid type.',
      statusCode: 409
    }
  try {
    await skillsPageRepository.updateSkillsPage(validPage.data)
    return {
      statusCode: 204
    }
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : undefined,
      statusCode: 409
    }
  }
}

async function deleteSkillsPageHandler(): Promise<HandlerResponse> {
  try {
    await skillsPageRepository.deleteSkillsPage()
    return { statusCode: 204 }
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : undefined,
      statusCode: 500
    }
  }

}

export {
  getSkillsPageHandler,
  createSkillsPageHandler,
  updateSkillsPageHandler,
  deleteSkillsPageHandler
};
