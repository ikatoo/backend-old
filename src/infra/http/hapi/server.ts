import { server } from "@hapi/hapi";
import routes from "./routes";
import { env } from "@/env";

const hapiServer = server({
  port: env.PORT,
  host: env.HOST,
});

hapiServer.route(routes);

const init = async () => {
  await hapiServer.initialize();
  return hapiServer;
};

const start = async () => {
  await hapiServer.start();
  console.log(`Server running at: ${hapiServer.info.uri}`);
  return hapiServer;
};

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

export { init, start };
