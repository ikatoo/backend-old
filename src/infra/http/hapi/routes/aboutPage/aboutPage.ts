import { ReqRefDefaults, ServerRoute } from "@hapi/hapi";
import { aboutPageHandler } from "hapi/controllers";
const aboutPageRoutes: ServerRoute<
  ReqRefDefaults
>[] = [
  {
    method: "GET",
    path: "/about",
    handler: aboutPageHandler,
  },
];

export default aboutPageRoutes;
