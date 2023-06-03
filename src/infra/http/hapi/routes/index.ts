import { ReqRefDefaults, ServerRoute } from "@hapi/hapi";
import aboutPageRoutes from "./aboutPage";
import contactPageRoutes from "./contactPage";
import projectsPageRoutes from "./projectsPage";
import skillsPageRoutes from "./skillsPage";
import { version } from 'package.json';

const routes: ServerRoute<ReqRefDefaults>[] = [
  {
    method: "GET",
    path: "/",
    handler: (_request, h) => {
      return h.response({ version })
    },
  },
  ...aboutPageRoutes,
  ...skillsPageRoutes,
  ...contactPageRoutes,
  ...projectsPageRoutes
];

export default routes;
