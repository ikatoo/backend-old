import { SkillsPageRepository } from "@/infra/db";
import { PartialSkillsPageSchema, SkillsPageSchema } from "@/repository/ISkillsPage";
import { ConflictError } from "@/utils/httpErrors";

const skillsPageRepository = new SkillsPageRepository();

async function getSkillsPageHandler(): ControllerResponse {
  const pageData = await skillsPageRepository.getSkillsPage()
  if (!pageData) {
    return { statusCode: 204 }
  }
  return {
    body: pageData,
    statusCode: 200
  }
}

async function createSkillsPageHandler(handlerProps?: HandlerProps): ControllerResponse {
  if (!Object.keys(handlerProps?.parameters!).length) return {
    statusCode: 400
  }

  const validPage = SkillsPageSchema.safeParse(handlerProps?.parameters)
  if (!validPage.success)
    throw new ConflictError('Invalid type.')

  // return {
  //   error: 'Invalid type.',
  //   statusCode: 409
  // }
  try {
    await skillsPageRepository.createSkillsPage(validPage.data)
    return { statusCode: 201 }
  } catch (error) {
    if (error instanceof Error)
      throw new ConflictError(error.message)
    // return {
    //   error: error instanceof Error ? error.message : undefined,
    //   statusCode: 409
    // }
  }
}

async function updateSkillsPageHandler(handlerProps?: HandlerProps): ControllerResponse {
  if (!Object.keys(handlerProps?.parameters!).length) return {
    statusCode: 400
  }

  const validPage = PartialSkillsPageSchema.safeParse(handlerProps?.parameters)
  if (!validPage.success || Object.keys(validPage.data).length === 0)
    throw new ConflictError('Invalid type.')
  // return {
  //   error: 'Invalid type.',
  //   statusCode: 409
  // }
  try {
    await skillsPageRepository.updateSkillsPage(validPage.data)
    return {
      statusCode: 204
    }
  } catch (error) {
    if (error instanceof Error)
      throw new ConflictError(error.message)
    // return {
    //   error: error instanceof Error ? error.message : undefined,
    //   statusCode: 409
    // }
  }
}

async function deleteSkillsPageHandler(): ControllerResponse {
  await skillsPageRepository.deleteSkillsPage()
  return { statusCode: 204 }
}

export {
  getSkillsPageHandler,
  createSkillsPageHandler,
  updateSkillsPageHandler,
  deleteSkillsPageHandler
};
