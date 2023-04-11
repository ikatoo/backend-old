import hapiAdapter from "@/infra/http/adapters/hapiAdapter";
import { createContactsPageHandler, deleteContactsPageHandler, getContactsPageHandler, updateContactsPageHandler } from "@/infra/http/controllers/contactsPage/contactsPageController";
import { ContactPageSchema, PartialContactPageSchema } from "@/repository/IContactPage";
import { ReqRefDefaults, ServerRoute } from "@hapi/hapi";
const contactPageRoutes: ServerRoute<
  ReqRefDefaults
>[] = [
    {
      method: "GET",
      path: "/contact",
      handler: hapiAdapter(getContactsPageHandler),
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
      handler: hapiAdapter(createContactsPageHandler),
    },
    {
      method: "PATCH",
      path: "/contact",
      handler: hapiAdapter(updateContactsPageHandler)
    },
    {
      method: "DELETE",
      path: '/contact',
      handler: hapiAdapter(deleteContactsPageHandler)
    }
  ];

export default contactPageRoutes;
