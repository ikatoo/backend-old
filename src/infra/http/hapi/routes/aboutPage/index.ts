import hapiAdapter from "@/infra/http/adapters/hapiAdapter";
import { getAboutPageHandler } from "@/infra/http/controllers";
import { createAboutPageHandler, deleteAboutPageHandler, updateAboutPageHandler } from "@/infra/http/controllers/aboutPage/aboutPageController";
import { ReqRefDefaults, ServerRoute } from "@hapi/hapi";
const aboutPageRoutes: ServerRoute<
  ReqRefDefaults
>[] = [
    {
      method: "GET",
      path: "/about",
      handler: hapiAdapter(getAboutPageHandler)
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
      handler: hapiAdapter(createAboutPageHandler)
    },
    {
      method: "PATCH",
      path: "/about",
      handler: hapiAdapter(updateAboutPageHandler)
    },
    {
      method: "DELETE",
      path: '/about',
      handler: hapiAdapter(deleteAboutPageHandler)
    }
  ];

export default aboutPageRoutes;
