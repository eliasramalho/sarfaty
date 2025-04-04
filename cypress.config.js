const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "yxk8g9",
  e2e: {

    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl:'https://portal-dev.internal.gruposarfaty.com.br',
    viewportHeight: 1080,
    viewportWidth: 1920,
    experimentalStudio: true,
  },
});
