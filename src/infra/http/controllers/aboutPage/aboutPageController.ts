import { AboutPageRepository } from "@/infra/db";
import { AboutPage, AboutPageSchema, PartialAboutPageSchema } from "@/repository/IAboutPage";
import { ConflictError } from "@/utils/httpErrors";

const aboutPageRepository = new AboutPageRepository();

async function getAboutPageHandler(): Promise<HandlerResponse> {
  const body = await aboutPageRepository.getAboutPage() ?? {}

  return { body, statusCode: 200 }
}

async function createAboutPageHandler(handlerProps?: HandlerProps<AboutPage>): Promise<HandlerResponse | void> {
  const aboutPage = handlerProps?.parameters?.data
  if (!aboutPage || !Object.keys(aboutPage).length) return {
    statusCode: 400
  }
  const validPage = AboutPageSchema.safeParse(aboutPage)
  if (!validPage.success)
    throw new ConflictError('Invalid type.')

  try {
    await aboutPageRepository.createAboutPage(validPage.data)
    return { statusCode: 201 }
  } catch (error) {
    if (error instanceof Error && error.message.includes('duplicate')) {
      throw new ConflictError('Duplicated data.')
    }
  }
}

async function updateAboutPageHandler(handlerProps?: HandlerProps<Partial<AboutPage>>): Promise<HandlerResponse | void> {
  const aboutPage = handlerProps?.parameters?.data
  if (!aboutPage || !Object.keys(aboutPage).length) return {
    statusCode: 400
  }

  const validPage = PartialAboutPageSchema.safeParse(aboutPage)
  if (!validPage.success || Object.keys(validPage.data).length === 0)
    throw new ConflictError('Invalid type.')

  try {
    await aboutPageRepository.updateAboutPage(validPage.data)
    return {
      statusCode: 204
    }
  } catch (error) {
    if (error instanceof Error && error.message.includes('duplicate'))
      throw new ConflictError('Duplicated data.')
  }
}

async function deleteAboutPageHandler(): Promise<HandlerResponse | void> {
  await aboutPageRepository.deleteAboutPage()
  return { statusCode: 204 }
}

export {
  getAboutPageHandler,
  createAboutPageHandler,
  updateAboutPageHandler,
  deleteAboutPageHandler
};
