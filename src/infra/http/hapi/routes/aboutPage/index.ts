import { ReqRefDefaults, ServerRoute } from "@hapi/hapi";
import { getAboutPageHandler } from "hapi/controllers";
const aboutPageRoutes: ServerRoute<
  ReqRefDefaults
>[] = [
  {
    method: "GET",
    path: "/about",
    handler: getAboutPageHandler,
  },
];

export default aboutPageRoutes;
