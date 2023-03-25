import { ReqRefDefaults, ServerRoute } from "@hapi/hapi";
import { getSkillsPageHandler } from "@/infra/http/controllers";
const skillsPageRoutes: ServerRoute<
  ReqRefDefaults
>[] = [
  {
    method: "GET",
    path: "/skills",
    handler: getSkillsPageHandler,
  },
];

export default skillsPageRoutes;
