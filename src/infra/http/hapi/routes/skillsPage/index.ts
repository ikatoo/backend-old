import hapiAdapter from "@/infra/http/adapters/hapiAdapter";
import { getSkillsPageHandler } from "@/infra/http/controllers";
import { createSkillsPageHandler, deleteSkillsPageHandler, updateSkillsPageHandler } from "@/infra/http/controllers/skillsPage/skillsPageController";
import { ReqRefDefaults, ServerRoute } from "@hapi/hapi";
const skillsPageRoutes: ServerRoute<
  ReqRefDefaults
>[] = [
    {
      method: "GET",
      path: "/skills",
      handler: hapiAdapter(getSkillsPageHandler)
    },
    {
      method: "PUT",
      path: "/skills",
      handler: async (_request, h) => {
        return h.response().code(405)
      }
    },
    {
      method: "POST",
      path: "/skills",
      handler: hapiAdapter(createSkillsPageHandler)
    },
    {
      method: "PATCH",
      path: "/skills",
      handler: hapiAdapter(updateSkillsPageHandler)
    },
    {
      method: "DELETE",
      path: '/skills',
      handler: hapiAdapter(deleteSkillsPageHandler)
    }
  ];

export default skillsPageRoutes;
