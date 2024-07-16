import { defineConfig } from 'cypress'

export default defineConfig({
  projectId: 'oodmn1',
  chromeWebSecurity: false,
  defaultCommandTimeout: 30000,
  pageLoadTimeout: 120000,
  responseTimeout: 300000,
  videoCompression: false,
  experimentalModifyObstructiveThirdPartyCode: true,
  retries: {
    openMode: 0,
    runMode: 0,
  },
  env: {

  },
  viewportWidth: 1536,
  viewportHeight: 960,
  trashAssetsBeforeRuns: true,
  video: false,
  screenshotOnRunFailure: true,
  e2e: {
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.js')(on, config)
    },
    specPattern: 'cypress/e2e/**/**/*.feature',
    excludeSpecPattern: ['*.js', '*.md'],
  },
})