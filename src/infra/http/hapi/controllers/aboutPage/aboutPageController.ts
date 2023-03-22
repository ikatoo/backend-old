import { AboutPageRepository } from "@/infra/db/AboutPage";
import { Request, ResponseToolkit } from "@hapi/hapi";
import { notfoundResponse } from "hapi/routes/notFoundResponse";

async function getAboutPageHandler(_request?: Request, h?: ResponseToolkit) {
  const repository = new AboutPageRepository();
  return await repository.getAboutPage() ?? (!!h && notfoundResponse(h));
}

export { getAboutPageHandler };
