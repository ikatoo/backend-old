import { ContactPageRepository } from "@/infra/db";
import { ContactPageSchema, PartialContactPageSchema } from "@/repository/IContactPage";

const contactsPageRepository = new ContactPageRepository();

async function getContactsPageHandler(): Promise<HandlerResponse> {
  const contactPage = await contactsPageRepository.getContactPage()
  if (!contactPage) return { statusCode: 204 }

  return { body: contactPage, statusCode: 200 }
}

async function createContactsPageHandler(handlerProps?: HandlerProps): Promise<HandlerResponse> {
  if (!Object.keys(handlerProps?.parameters!).length) return {
    statusCode: 400
  }

  const validPage = ContactPageSchema.safeParse(handlerProps?.parameters)
  if (!validPage.success)
    return {
      error: 'Invalid type.',
      statusCode: 409
    }
  try {
    await contactsPageRepository.createContactPage(validPage.data)
    return {
      statusCode: 201
    }
  } catch (error) {
    if (error instanceof Error && error.message.includes('duplicate'))
      return {
        error: error.message,
        statusCode: 409
      }
    return { statusCode: 500 }
  }

}

async function updateContactsPageHandler(handlerProps?: HandlerProps): Promise<HandlerResponse> {
  if (!handlerProps?.parameters || !Object.keys(handlerProps.parameters).length) return {
    statusCode: 400
  }

  const validPage = PartialContactPageSchema.safeParse(handlerProps?.parameters)
  if (!validPage.success || Object.keys(validPage.data).length === 0)
    return {
      error: 'Invalid type.',
      statusCode: 409
    }
  try {
    await contactsPageRepository.updateContactPage(validPage.data)
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

async function deleteContactsPageHandler(): Promise<HandlerResponse> {
  try {
    await contactsPageRepository.deleteContactPage()
    return {
      statusCode: 204
    }
  } catch (error) {
    if (error instanceof Error) {
      return {
        statusCode: 500,
        error: error.message
      }
    }
    return {
      statusCode: 500,
    }

  }
}

export {
  getContactsPageHandler,
  createContactsPageHandler,
  updateContactsPageHandler,
  deleteContactsPageHandler
};
