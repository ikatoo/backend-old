import { ReqRefDefaults, ServerRoute } from "@hapi/hapi";
import aboutPageRoutes from "./aboutPage";

const routes: ServerRoute<ReqRefDefaults>[] = [
  {
    method: "GET",
    path: "/",
    handler: function () {
      return { version: `${process.env.npm_package_version}` };
    },
  },
  ...aboutPageRoutes,
];

export default routes;
