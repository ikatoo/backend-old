import hapiAdapter from "@/infra/http/adapters/hapiAdapter";
import { createProjectHandler, deleteProjectHandler, getProjectByIDHandler, getProjectsByTitleHandler, getProjectsHandler, updateProjectHandler } from "@/infra/http/controllers/projectsPage/projectsPageController";
import { ReqRefDefaults, ServerRoute } from "@hapi/hapi";
const projectsPageRoutes: ServerRoute<
  ReqRefDefaults
>[] = [
    {
      method: "GET",
      path: "/projects",
      handler: hapiAdapter(getProjectsHandler)
    },
    {
      method: "GET",
      path: "/projects/title/{title}",
      handler: hapiAdapter(getProjectsByTitleHandler)
    },
    {
      method: "GET",
      path: "/project/id/{id}",
      handler: hapiAdapter(getProjectByIDHandler)
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
      handler: hapiAdapter(createProjectHandler)
    },
    {
      method: "PATCH",
      path: "/project/id/{id}",
      handler: hapiAdapter(updateProjectHandler)
    },
    {
      method: "DELETE",
      path: "/project/id/{id}",
      handler: hapiAdapter(deleteProjectHandler)
    }
  ];

export default projectsPageRoutes;
