import HapiAdapter from "@/infra/http/adapters/hapiAdapter";
import { getAboutPageHandler } from "@/infra/http/controllers";
import { createAboutPageHandler, deleteAboutPageHandler, updateAboutPageHandler } from "@/infra/http/controllers/aboutPage/aboutPageController";
import { ReqRefDefaults, ServerRoute } from "@hapi/hapi";
const aboutPageRoutes: ServerRoute<
  ReqRefDefaults
>[] = [
    {
      method: "GET",
      path: "/about",
      handler: HapiAdapter.get(getAboutPageHandler)
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
      handler: HapiAdapter.update(updateAboutPageHandler)
    },
    {
      method: "DELETE",
      path: '/about',
      handler: HapiAdapter.delete(deleteAboutPageHandler)
    }
  ];

export default aboutPageRoutes;
