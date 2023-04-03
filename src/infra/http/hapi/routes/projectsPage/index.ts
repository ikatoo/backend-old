import { createProjectHandler, deleteProjectHandler, getProjectByIDHandler, getProjectsByTitleHandler, getProjectsHandler, updateProjectHandler } from "@/infra/http/controllers/projectsPage/projectsPageController";
import { PartialProjectSchema, ProjectSchema } from "@/repository/IProject";
import { ReqRefDefaults, ServerRoute } from "@hapi/hapi";
const projectsPageRoutes: ServerRoute<
  ReqRefDefaults
>[] = [
    {
      method: "GET",
      path: "/projects",
      handler: async (_request, h) => {
        const projects = await getProjectsHandler()
        if (!projects.length) {
          return h.response().code(404)
        }
        return h.response(projects)
      },
    },
    {
      method: "GET",
      path: "/project/title/{title}",
      handler: async (request, h) => {
        const title = request.params.title
        const projects = await getProjectsByTitleHandler(title)
        if (!projects.length) {
          return h.response().code(404)
        }
        return h.response(projects)
      },
    },
    {
      method: "GET",
      path: "/project/id/{id}",
      handler: async (request, h) => {
        const id = request.params.id
        const project = await getProjectByIDHandler(id)
        if (!project) {
          return h.response().code(404)
        }
        return h.response(project)
      },
    },
    {
      method: "PUT",
      path: "/{project*}",
      handler: async (_request, h) => {
        return h.response().code(405)
      }
    },
    {
      method: "POST",
      path: "/project",
      handler: async (request, h) => {
        if (!request.payload) return h.response().code(400)

        const validPage = ProjectSchema.safeParse(request.payload)
        if (!validPage.success)
          return h.response({
            error: 'Invalid type.'
          }).code(409)
        try {
          await createProjectHandler(validPage.data)
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
      method: "PATCH",
      path: "/project/id/{id}",
      handler: async (request, h) => {
        if (!request.payload || !request.params.id) return h.response().code(400)

        const validPage = PartialProjectSchema.safeParse(request.payload)
        if (!validPage.success || Object.keys(validPage.data).length === 0)
          return h.response({
            error: 'Invalid type.'
          }).code(409)
        try {
          await updateProjectHandler(request.params.id, validPage.data)
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
      path: "/project/id/{id}",
      handler: async (request, h) => {
        const id = request.params.id
        if (!id) {
          return h.response().code(400)
        }
        await deleteProjectHandler(id)
        return h.response().code(204)
      }
    }
  ];

export default projectsPageRoutes;
