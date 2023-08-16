import { expressAdapter } from "@/infra/http/adapters/expressAdapter";
import { createContactsPageHandler, deleteContactsPageHandler, getContactsPageHandler, updateContactsPageHandler } from "@/infra/http/controllers/contactsPage/contactsPageController";

import { Router } from 'express';
import verifyTokenMiddleware from "../../middlewares/verifyTokenMiddleware";

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
  verifyTokenMiddleware,
  expressAdapter(createContactsPageHandler)
)

contactRoutes.patch(
  '/contact',
  verifyTokenMiddleware,
  expressAdapter(updateContactsPageHandler)
)

contactRoutes.delete(
  '/contact',
  verifyTokenMiddleware,
  expressAdapter(deleteContactsPageHandler)
)

export { contactRoutes };
