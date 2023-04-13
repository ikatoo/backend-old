import { expressAdapter } from "@/infra/http/adapters/expressAdapter";
import { createProjectHandler, deleteProjectHandler, getProjectByIDHandler, getProjectsByTitleHandler, getProjectsHandler, updateProjectHandler } from "@/infra/http/controllers/projectsPage/projectsPageController";
import { Router } from "express";

const projectsRoute = Router()

projectsRoute.put(
  '/projects',
  (_request, response) => response.status(405).send()
)

projectsRoute.get(
  '/projects',
  expressAdapter(getProjectsHandler)
)

projectsRoute.get(
  '/project/id/:id',
  expressAdapter(getProjectByIDHandler)
)

projectsRoute.get(
  '/projects/title/:title',
  expressAdapter(getProjectsByTitleHandler)
)

projectsRoute.post(
  '/project',
  expressAdapter(createProjectHandler)
)

projectsRoute.patch(
  '/project/id/:id',
  expressAdapter(updateProjectHandler)
)

projectsRoute.delete(
  '/project/id/:id',
  expressAdapter(deleteProjectHandler)
)

export { projectsRoute };

