import HapiAdapter from "@/infra/http/adapters/hapi";
import { getAboutPageHandler } from "@/infra/http/controllers";
import { createAboutPageHandler, deleteAboutPageHandler, updateAboutPageHandler } from "@/infra/http/controllers/aboutPage/aboutPageController";
import { PartialAboutPageSchema } from "@/repository/IAboutPage";
import { ReqRefDefaults, ServerRoute } from "@hapi/hapi";
const aboutPageRoutes: ServerRoute<
  ReqRefDefaults
>[] = [
    {
      method: "GET",
      path: "/about",
      handler: async (_request, h) => {
        const pageData = await getAboutPageHandler()
        if (!pageData) return h.response().code(204)
        return h.response(pageData)
      }
    },
    {
      method: "PUT",
      path: "/about",
      handler: async (_request, h) => {
        return h.response().code(405)
      }
    },
    {
      method: "POST",
      path: "/about",
      handler: HapiAdapter.create(createAboutPageHandler)
    },
    {
      method: "PATCH",
      path: "/about",
      handler: async (request, h) => {
        if (!request.payload) return h.response().code(400)

        const validPage = PartialAboutPageSchema.safeParse(request.payload)
        if (!validPage.success || Object.keys(validPage.data).length === 0)
          return h.response({
            error: 'Invalid type.'
          }).code(409)
        try {
          await updateAboutPageHandler(validPage.data)
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
      method: "DELETE",
      path: '/about',
      handler: async (_request, h) => {
        await deleteAboutPageHandler()
        return h.response().code(204)
      }
    }
  ];

export default aboutPageRoutes;
