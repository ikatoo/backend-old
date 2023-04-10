import { AboutPageRepository } from "@/infra/db";
import { AboutPage, AboutPageSchema } from "@/repository/IAboutPage";

export type StatusCode = { statusCode?: number }
export type AboutPageController = (page: AboutPage) => Promise<StatusCode>

const aboutPageRepository = new AboutPageRepository();

async function getAboutPageHandler() {
  const aboutPage = await aboutPageRepository.getAboutPage()

  return aboutPage
}

async function createAboutPageHandler(page: AboutPage): Promise<ControllerResponse> {
  const validPage = AboutPageSchema.safeParse(page)
  if (!validPage.success)
    return {
      error: 'Invalid type.',
      statusCode: 409
    }

  try {
    await aboutPageRepository.createAboutPage(page)
    return { statusCode: 201 }
  } catch (error) {
    if (error instanceof Error && error.message.includes('duplicate'))
      return {
        error: error.message,
        statusCode: 409
      }
    return { statusCode: 500 }
  }
}

async function updateAboutPageHandler(page: Partial<AboutPage>) {
  await aboutPageRepository.updateAboutPage(page)
}

async function deleteAboutPageHandler() {
  await aboutPageRepository.deleteAboutPage()
}

export {
  getAboutPageHandler,
  createAboutPageHandler,
  updateAboutPageHandler,
  deleteAboutPageHandler
};
