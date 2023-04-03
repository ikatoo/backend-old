import { getSkillsPageHandler } from "@/infra/http/controllers";
import { createSkillsPageHandler, deleteSkillsPageHandler, updateSkillsPageHandler } from "@/infra/http/controllers/skillsPage/skillsPageController";
import { PartialSkillsPageSchema, SkillsPageSchema } from "@/repository/ISkillsPage";
import { ReqRefDefaults, ServerRoute } from "@hapi/hapi";
const skillsPageRoutes: ServerRoute<
  ReqRefDefaults
>[] = [
    {
      method: "GET",
      path: "/skills",
      handler: async (_request, h) => {
        const pageData = await getSkillsPageHandler()
        if (!pageData) {
          return h.response().code(204)
        }
        return h.response(pageData)
      },
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
      handler: async (request, h) => {
        if (!request.payload) return h.response().code(400)

        const validPage = SkillsPageSchema.safeParse(request.payload)
        if (!validPage.success)
          return h.response({
            error: 'Invalid type.'
          }).code(409)
        try {
          await createSkillsPageHandler(validPage.data)
          return h.response().code(201)
        } catch (error) {
          if (error instanceof Error && error.message.includes('duplicate'))
            return h.response({
              error: error.message
            }).code(409)
        }
      }
    },
    {
      method: "PATCH",
      path: "/skills",
      handler: async (request, h) => {
        if (!request.payload) return h.response().code(400)

        const validPage = PartialSkillsPageSchema.safeParse(request.payload)
        if (!validPage.success || Object.keys(validPage.data).length === 0)
          return h.response({
            error: 'Invalid type.'
          }).code(409)
        try {
          await updateSkillsPageHandler(validPage.data)
          return h.response().code(204)
        } catch (error) {
          if (error instanceof Error && error.message.includes('duplicate'))
            return h.response({
              error: error.message
            }).code(409)
        }
      }
    },
    {
      method: "DELETE",
      path: '/skills',
      handler: async (_request, h) => {
        await deleteSkillsPageHandler()
        return h.response().code(204)
      }
    }
  ];

export default skillsPageRoutes;
