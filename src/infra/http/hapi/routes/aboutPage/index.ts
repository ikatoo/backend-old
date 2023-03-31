import { getAboutPageHandler } from "@/infra/http/controllers";
import { createAboutPageHandler, updateAboutPageHandler } from "@/infra/http/controllers/aboutPage/aboutPageController";
import { AboutPage, AboutPageSchema } from "@/repository/IAboutPage";
import { ReqRefDefaults, ServerRoute } from "@hapi/hapi";
const aboutPageRoutes: ServerRoute<
  ReqRefDefaults
>[] = [
    {
      method: "GET",
      path: "/about",
      handler: async (_request, h) => {
        const page = await getAboutPageHandler()
        if (!page) return h.response().code(404)
        return h.response(page)
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
      method: ["POST", "PATCH"],
      path: "/about",
      handler: async (request, h) => {
        if (!request.payload) return h.response().code(400)

        const validPage = AboutPageSchema.safeParse(request.payload)
        if (!validPage.success)
          return h.response({
            error: 'Invalid type.'
          }).code(409)
        try {
          request.method === 'post'
            ? await createAboutPageHandler(validPage.data)
            : await updateAboutPageHandler(validPage.data)
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

export default aboutPageRoutes;
