/// <reference types="cypress" />
const cucumber = require('cypress-cucumber-preprocessor').default
/**
 * @type {Cypress.PluginConfig}
 */
const fs = require('fs-extra')
const path = require('path')
const allureWriter = require('@shelex/cypress-allure-plugin/writer')


const { beforeRunHook, afterRunHook } = require('cypress-mochawesome-reporter/lib');  
const exec = require('child_process').execSync;  

module.exports = (on) => {  
  on('before:run', async (details) => {  
    console.log('override before:run');  
    await beforeRunHook(details);  
    //If you are using other than Windows remove below two lines  
    await exec("IF EXIST cypress\\screenshots rmdir /Q /S cypress\\screenshots")  
    await exec("IF EXIST cypress\\reports rmdir /Q /S cypress\\reports")  
  });

  on('after:run', async () => {
    console.log('override after:run');  
    //if you are using other than Windows remove below line starts with await exec  
    await exec("npx jrm ./cypress/reports/junitreport.xml ./cypress/reports/junit/*.xml");  
    await afterRunHook();  
  });  
};

function getConfigurationByFile (file) {
  const pathToConfigFile = path.resolve('cypress', 'environments', `${file}.json`)
  if (!fs.existsSync(pathToConfigFile)) {
    return {}
  }

  return fs.readJson(pathToConfigFile)
}

module.exports = (on, config) => {
  const logOptions = {
    printLogsToConsole: "always"
  }
  require('cypress-terminal-report/src/installLogsPrinter')(on, logOptions)
  on('file:preprocessor', cucumber())
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
  on('before:browser:launch', (browser, launchOptions) => {
    if (browser.name == "chrome" && browser.isHeadless)
    launchOptions.args.push('--suppress-message-center-popups')
  })
  const file = config.env.configFile
  
  on('before:browser:launch', (browser, launchOptions) => {
  if (browser.name === 'chrome' && browser.isHeadless) {
      launchOptions.args.push('--disable-gpu');
      return launchOptions
    }
  });

  on("task", {
    getPackagePath() {
      return path.dirname(require.resolve("cypress-zapi-js/package.json"));
    },
  });

  on('task', {
    'gmail:get-messages': async args => {
      const cred = path.resolve(__dirname, 'credentials.json')
      gmail.refresh_access_token(cred, 'token.json')
      const messages = await gmail.get_messages(
        path.resolve(__dirname, 'credentials.json'),
        path.resolve(__dirname, 'token.json'),
        args.options
      )
      return messages
    }
  })

  on('task', {
    existsSync({path}) {
      return fs.existsSync(path);
    }
  });

  on('task', {
    readdir({path}) {
      return fs.readdir(path);
    }
  });

  on('task', {
    fixture (fixtures) {
      const result = require('./../fixtures/' + fixtures)
      return result;
    }
  })

  allureWriter(on, config)

  return getConfigurationByFile(file)
}
