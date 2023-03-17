import { ResponseToolkit } from "@hapi/hapi";

const notfoundResponse = (h: ResponseToolkit) =>
  h.response({ message: "Page not found" }).code(404);

export { notfoundResponse };
