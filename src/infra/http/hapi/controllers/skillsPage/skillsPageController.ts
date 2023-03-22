import { SkillsPageRepository } from "@/infra/db/SkillsPage";
import { Request, ResponseToolkit } from "@hapi/hapi";
import { notfoundResponse } from "hapi/routes/notFoundResponse";

async function getSkillsPageHandler(_request?: Request, h?: ResponseToolkit) {
  const repository = new SkillsPageRepository();
  return await repository.getSkillsPage() ?? (!!h && notfoundResponse(h));
}

export { getSkillsPageHandler };
