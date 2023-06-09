import { ReqRefDefaults, ServerRoute } from "@hapi/hapi";
import aboutPageRoutes from "./aboutPage";
import contactPageRoutes from "./contactPage";
import projectsPageRoutes from "./projectsPage";
import skillsPageRoutes from "./skillsPage";
import { readFile } from "fs/promises";

const routes: ServerRoute<ReqRefDefaults>[] = [
  {
    method: "GET",
    path: "/",
    handler: async (_request, h) => {
      const packageString = await readFile('./package.json')
      const packageJson = JSON.parse(packageString.toString('utf-8'))
      return h.response({ version: packageJson.version })
    },
  },
  ...aboutPageRoutes,
  ...skillsPageRoutes,
  ...contactPageRoutes,
  ...projectsPageRoutes
];

export default routes;
