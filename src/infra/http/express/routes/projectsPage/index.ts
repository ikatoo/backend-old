import { expressAdapter } from "@/infra/http/adapters/expressAdapter";
import { createProjectHandler, deleteProjectHandler, getProjectByIDHandler, getProjectsByTitleHandler, getProjectsHandler, updateProjectHandler } from "@/infra/http/controllers/projectsPage/projectsPageController";
import { Router } from "express";

const projectsRoutes = Router()

projectsRoutes.put(
  '/projects',
  (_request, response) => response.status(405).send()
)

projectsRoutes.get(
  '/projects',
  expressAdapter(getProjectsHandler)
)

projectsRoutes.get(
  '/project/id/:id',
  expressAdapter(getProjectByIDHandler)
)

projectsRoutes.get(
  '/projects/title/:title',
  expressAdapter(getProjectsByTitleHandler)
)

projectsRoutes.post(
  '/project',
  expressAdapter(createProjectHandler)
)

projectsRoutes.patch(
  '/project/id/:id',
  expressAdapter(updateProjectHandler)
)

projectsRoutes.delete(
  '/project/id/:id',
  expressAdapter(deleteProjectHandler)
)

export { projectsRoutes };

