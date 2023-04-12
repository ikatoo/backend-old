import { AboutPageRepository } from "@/infra/db";
import { AboutPageSchema, PartialAboutPageSchema } from "@/repository/IAboutPage";

const aboutPageRepository = new AboutPageRepository();

async function getAboutPageHandler(): Promise<HandlerResponse> {
  const body = await aboutPageRepository.getAboutPage()
  if (!body) {
    return { statusCode: 204 }
  }

  return { body, statusCode: 200 }
}

async function createAboutPageHandler(handlerProps?: HandlerProps): Promise<HandlerResponse> {
  if (!Object.keys(handlerProps?.parameters!).length) return {
    statusCode: 400
  }
  const validPage = AboutPageSchema.safeParse(handlerProps?.parameters)
  if (!validPage.success)
    return {
      error: 'Invalid type.',
      statusCode: 409
    }

  try {
    await aboutPageRepository.createAboutPage(validPage.data)
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

async function updateAboutPageHandler(handlerProps?: HandlerProps): Promise<HandlerResponse> {
  if (!Object.keys(handlerProps?.parameters!).length) return {
    statusCode: 400
  }

  const validPage = PartialAboutPageSchema.safeParse(handlerProps?.parameters)
  if (!validPage.success || Object.keys(validPage.data).length === 0)
    return ({
      error: 'Invalid type.',
      statusCode: 409
    })

  try {
    await aboutPageRepository.updateAboutPage(validPage.data)
    return {
      statusCode: 204
    }
  } catch (error) {
    if (error instanceof Error && error.message.includes('duplicate'))
      return {
        error: error.message,
        statusCode: 409
      }
  }

  return {
    statusCode: 500
  }
}

async function deleteAboutPageHandler(): Promise<HandlerResponse> {
  try {
    await aboutPageRepository.deleteAboutPage()
    return { statusCode: 204 }
  } catch (error) {
    if (error instanceof Error)
      return {
        statusCode: 500,
        error: error.message
      }
  }
  return { statusCode: 500 }
}

export {
  getAboutPageHandler,
  createAboutPageHandler,
  updateAboutPageHandler,
  deleteAboutPageHandler
};
