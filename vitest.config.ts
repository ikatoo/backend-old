import { fileURLToPath, URL } from "url";
import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "hapi": fileURLToPath(new URL("./src/infra/http/hapi", import.meta.url)),
    },
  },
});
