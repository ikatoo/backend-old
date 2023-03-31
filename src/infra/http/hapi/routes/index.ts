import { ReqRefDefaults, ServerRoute } from "@hapi/hapi";
import aboutPageRoutes from "./aboutPage";
import skillsPageRoutes from "./skillsPage";

const routes: ServerRoute<ReqRefDefaults>[] = [
  {
    method: "GET",
    path: "/",
    handler: (_request, h) => {
      return h.response({
        version: process.env.npm_package_version
      })
    },
  },
  ...aboutPageRoutes,
  ...skillsPageRoutes
];

export default routes;
