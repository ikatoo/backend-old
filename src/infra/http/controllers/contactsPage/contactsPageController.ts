import { ContactPageRepository } from "@/infra/db";
import { ContactPageSchema, PartialContactPageSchema } from "@/repository/IContactPage";
import { ConflictError, HttpError, InternalError } from "@/utils/httpErrors";

const contactsPageRepository = new ContactPageRepository();

async function getContactsPageHandler(): ControllerResponse {
  const contactPage = await contactsPageRepository.getContactPage()
  if (!contactPage) return { statusCode: 204 }

  return { body: contactPage, statusCode: 200 }
}

async function createContactsPageHandler(handlerProps?: HandlerProps): ControllerResponse {
  if (!Object.keys(handlerProps?.parameters!).length) return {
    statusCode: 400
  }

  const validPage = ContactPageSchema.safeParse(handlerProps?.parameters)
  if (!validPage.success)
    throw new ConflictError('Invalid type.')
  try {
    await contactsPageRepository.createContactPage(validPage.data)
    return {
      statusCode: 201
    }
  } catch (error) {
    if (error instanceof Error && error.message.includes('duplicate'))
      throw new ConflictError('Duplicated data.')
  }

}

async function updateContactsPageHandler(handlerProps?: HandlerProps): ControllerResponse {
  if (!handlerProps?.parameters || !Object.keys(handlerProps.parameters).length) return {
    statusCode: 400
  }

  const validPage = PartialContactPageSchema.safeParse(handlerProps?.parameters)
  if (!validPage.success || Object.keys(validPage.data).length === 0)
    throw new ConflictError('Invalid type.')
  try {
    await contactsPageRepository.updateContactPage(validPage.data)
    return {
      statusCode: 204
    }
  } catch (error) {
    if (error instanceof Error && error.message.includes('duplicate'))
      throw new ConflictError('Duplicated data.')
  }
  return {
    statusCode: 500
  }
}

async function deleteContactsPageHandler(): ControllerResponse {
  try {
    await contactsPageRepository.deleteContactPage()
    return {
      statusCode: 204
    }
  } catch (error) {
    if (error instanceof Error)
      throw new InternalError()
  }
}

export {
  getContactsPageHandler,
  createContactsPageHandler,
  updateContactsPageHandler,
  deleteContactsPageHandler
};
