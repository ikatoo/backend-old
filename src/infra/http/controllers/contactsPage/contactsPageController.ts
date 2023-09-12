import { ContactPageRepository } from "@/infra/db";
import { ContactPage, ContactPageSchema, PartialContactPageSchema } from "@/repository/IContactPage";
import { ConflictError, InternalError } from "@/utils/httpErrors";

const contactsPageRepository = new ContactPageRepository();

async function getContactsPageHandler(): ControllerResponse {
  const contactPage = await contactsPageRepository.getContactPage()

  return { body: contactPage, statusCode: 200 }
}

async function createContactsPageHandler(handlerProps?: HandlerProps<ContactPage>): ControllerResponse {
  const contactPage = handlerProps?.parameters?.data
  if (!contactPage || !Object.keys(contactPage).length) return {
    statusCode: 400
  }

  const validPage = ContactPageSchema.safeParse(contactPage)
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

async function updateContactsPageHandler(handlerProps?: HandlerProps<Partial<ContactPage>>): ControllerResponse {
  const contactPage = handlerProps?.parameters?.data
  if (!contactPage || !Object.keys(contactPage).length) return {
    statusCode: 400
  }

  const validPage = PartialContactPageSchema.safeParse(contactPage)
  if (!validPage.success || !Object.keys(validPage.data).length)
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
  createContactsPageHandler, deleteContactsPageHandler, getContactsPageHandler, updateContactsPageHandler
};
