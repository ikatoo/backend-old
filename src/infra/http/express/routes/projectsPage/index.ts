import { expressAdapter } from "@/infra/http/adapters/expressAdapter";
import { createProjectHandler, deleteProjectHandler, getProjectByIDHandler, getProjectsByTitleHandler, getProjectsHandler, updateProjectHandler } from "@/infra/http/controllers/projectsPage/projectsPageController";
import { Router } from "express";
import verifyTokenMiddleware from "../../middlewares/verifyTokenMiddleware";

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
  verifyTokenMiddleware,
  expressAdapter(createProjectHandler)
)

projectsRoutes.patch(
  '/project/id/:id',
  verifyTokenMiddleware,
  expressAdapter(updateProjectHandler)
)

projectsRoutes.delete(
  '/project/id/:id',
  verifyTokenMiddleware,
  expressAdapter(deleteProjectHandler)
)

export { projectsRoutes };

