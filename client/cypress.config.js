const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    "experimentalSessionandOrigin": true,
    "trashAssetsBeforeRuns": true,
    "baseUrl": "http://localhost:3000"
  },
});
