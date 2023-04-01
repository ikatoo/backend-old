import { createContactsPageHandler, getContactsPageHandler, updateContactsPageHandler } from "@/infra/http/controllers/contactsPage/contactsPageController";
import { ContactPageSchema, PartialContactPageSchema } from "@/repository/IContactPage";
import { ReqRefDefaults, ServerRoute } from "@hapi/hapi";
const contactPageRoutes: ServerRoute<
  ReqRefDefaults
>[] = [
    {
      method: "GET",
      path: "/contact",
      handler: async (_request, h) => {
        const page = await getContactsPageHandler()
        if (!page) {
          return h.response().code(404)
        }
        return h.response(page)
      },
    },
    {
      method: "PUT",
      path: "/contact",
      handler: async (_request, h) => {
        return h.response().code(405)
      }
    },
    {
      method: "POST",
      path: "/contact",
      handler: async (request, h) => {
        if (!request.payload) return h.response().code(400)

        const validPage = ContactPageSchema.safeParse(request.payload)
        if (!validPage.success)
          return h.response({
            error: 'Invalid type.'
          }).code(409)
        try {
          await createContactsPageHandler(validPage.data)
          return h.response().code(204)
        } catch (error) {
          if (error instanceof Error && error.message.includes('duplicate'))
            return h.response({
              error: error.message
            }).code(409)
        }
      }
    },
    {
      method: "PATCH",
      path: "/contact",
      handler: async (request, h) => {
        if (!request.payload) return h.response().code(400)

        const validPage = PartialContactPageSchema.safeParse(request.payload)
        if (!validPage.success || Object.keys(validPage.data).length === 0)
          return h.response({
            error: 'Invalid type.'
          }).code(409)
        try {
          await updateContactsPageHandler(validPage.data)
          return h.response().code(204)
        } catch (error) {
          if (error instanceof Error && error.message.includes('duplicate'))
            return h.response({
              error: error.message
            }).code(409)
        }
      }
    }
  ];

export default contactPageRoutes;
