import { getAboutPageHandler } from "@/infra/http/controllers";
import { ReqRefDefaults, ServerRoute } from "@hapi/hapi";
const aboutPageRoutes: ServerRoute<
  ReqRefDefaults
>[] = [
    {
      method: "GET",
      path: "/about",
      handler: getAboutPageHandler
    },
  ];

export default aboutPageRoutes;
