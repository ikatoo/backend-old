import { expressAdapter } from "@/infra/http/adapters/expressAdapter";
import { getSkillsPageHandler } from "@/infra/http/controllers";
import { createSkillsPageHandler, deleteSkillsPageHandler, updateSkillsPageHandler } from "@/infra/http/controllers/skillsPage/skillsPageController";
import { Router } from "express";

const skillsRoutes = Router()

skillsRoutes.put(
  '/skills',
  (_request, response) => response.status(405).send()
)

skillsRoutes.get(
  '/skills',
  expressAdapter(getSkillsPageHandler)
)

skillsRoutes.post(
  '/skills',
  expressAdapter(createSkillsPageHandler)
)

skillsRoutes.patch(
  '/skills',
  expressAdapter(updateSkillsPageHandler)
)

skillsRoutes.delete(
  '/skills',
  expressAdapter(deleteSkillsPageHandler)
)

export { skillsRoutes };
