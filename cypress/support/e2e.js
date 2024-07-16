import './commands'
import './APICommands'
import 'cypress-mochawesome-reporter/register'
require('cypress-iframe')
require('cypress-xpath')
require('cypress-terminal-report/src/installLogsCollector')()
require('@shelex/cypress-allure-plugin') 


Cypress.on('uncaught:exception', (err, runnable) => {
  return false
})   