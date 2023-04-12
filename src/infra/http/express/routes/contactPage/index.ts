import { expressAdapter } from "@/infra/http/adapters/expressAdapter";
import { createContactsPageHandler, deleteContactsPageHandler, getContactsPageHandler, updateContactsPageHandler } from "@/infra/http/controllers/contactsPage/contactsPageController";

import { Router } from 'express';

const contactRoutes = Router()

contactRoutes.put(
  '/contact',
  (_request, response) => response.status(405).send()
)

contactRoutes.get(
  '/contact',
  expressAdapter(getContactsPageHandler)
)

contactRoutes.post(
  '/contact',
  expressAdapter(createContactsPageHandler)
)

contactRoutes.patch(
  '/contact',
  expressAdapter(updateContactsPageHandler)
)

contactRoutes.delete(
  '/contact',
  expressAdapter(deleteContactsPageHandler)
)

export { contactRoutes };
