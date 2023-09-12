import { SkillsPageRepository } from "@/infra/db";
import { PartialSkillsPageSchema, SkillsPage, SkillsPageSchema } from "@/repository/ISkillsPage";
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

async function createSkillsPageHandler(handlerProps?: HandlerProps<SkillsPage>): ControllerResponse {
  const skillsPage = handlerProps?.parameters?.data

  if (!skillsPage || !Object.keys(skillsPage).length) return {
    statusCode: 400
  }

  const validPage = SkillsPageSchema.safeParse(skillsPage)
  if (!validPage.success)
    throw new ConflictError('Invalid type.')
  try {
    await skillsPageRepository.createSkillsPage(validPage.data)
    return { statusCode: 201 }
  } catch (error) {
    if (error instanceof Error)
      throw new ConflictError(error.message)
  }
}

async function updateSkillsPageHandler(handlerProps?: HandlerProps<Partial<SkillsPage>>): ControllerResponse {
  const skillsPage = handlerProps?.parameters?.data

  if (!skillsPage || !Object.keys(skillsPage).length) return {
    statusCode: 400
  }

  const validPage = PartialSkillsPageSchema.safeParse(skillsPage)
  if (!validPage.success || Object.keys(validPage.data).length === 0)
    throw new ConflictError('Invalid type.')
  try {
    await skillsPageRepository.updateSkillsPage(validPage.data)
    return {
      statusCode: 204
    }
  } catch (error) {
    if (error instanceof Error)
      throw new ConflictError(error.message)
  }
}

async function deleteSkillsPageHandler(): ControllerResponse {
  await skillsPageRepository.deleteSkillsPage()
  return { statusCode: 204 }
}

export {
  createSkillsPageHandler, deleteSkillsPageHandler, getSkillsPageHandler, updateSkillsPageHandler
};

