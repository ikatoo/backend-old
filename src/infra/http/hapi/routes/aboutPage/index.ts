import { getAboutPageHandler } from "@/infra/http/controllers";
import { createAboutPageHandler, updateAboutPageHandler } from "@/infra/http/controllers/aboutPage/aboutPageController";
import { AboutPage } from "@/repository/IAboutPage";
import isValidPayloadKeys from "@/utils/typeUtils/isValidPayloadKeys";
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
        console.log(typeof request.payload)
        if (!isValidPayloadKeys<AboutPage>(request.payload as object))
          return h.response({
            error: 'Invalid type.'
          }).code(409)
        // for (const key of Object.keys(request.payload)) {
        //   if (!typeHasProperty<AboutPage>(request.payload, key))
        //     return h.response({
        //       error: 'Invalid type.'
        //     }).code(409)
        // }
        const page = request.payload as AboutPage
        try {
          request.method === 'post'
            ? await createAboutPageHandler(page)
            : await updateAboutPageHandler(page)
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
