import { defineConfig } from "cypress";

export default defineConfig({
  viewportWidth: 1920,
  viewportHeight: 1080,
  // defaultCommandTimeout: 90_000,
  requestTimeout: 90_000,
  responseTimeout: 90_000,
  e2e: {
    setupNodeEvents(on, config) {
      require("cypress-localstorage-commands/plugin")(on, config);

      return config;
    },
  },
});
