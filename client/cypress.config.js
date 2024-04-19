const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    "experimentalSessionandOrigin": true,
    "trashAssetsBeforeRuns": true,
    "baseUrl": window.location.href.includes('heroku') ? 'https://medical-mayhem-c0832c3f548e.herokuapp.com': 'http://localhost:3000'
  },
});