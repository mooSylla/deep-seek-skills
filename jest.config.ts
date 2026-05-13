import { defineConfig } from "jest";

export default defineConfig({
  injectGlobals: true,
  testEnvironment: "jsdom",
});
