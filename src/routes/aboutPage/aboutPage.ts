import aboutPageController from "@/controllers/aboutPageController";
import { ReqRefDefaults, ServerRoute } from "@hapi/hapi";

const aboutPageRoutes: ServerRoute<
  ReqRefDefaults
>[] = [
  {
    method: "GET",
    path: "/about",
    handler: aboutPageController,
  },
];

export default aboutPageRoutes;
