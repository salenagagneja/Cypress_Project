import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps";

import { pageObject } from "../../fixtures/pageobjects/pageObject.js";

Given(/^I open website$/,()=>{
  cy.OpenWebsite()
});

Then (/^I set text "([^"]*)?" for element "([^"]*)?"$/,(textValue, webElement)=>{

  let fullText = textValue
  textValue = fullText.split("|")[0]
  cy.log(textValue)
  let format = fullText.split("|")[1]
  let extendDate = fullText.split("|")[2]
  if (textValue.toLowerCase() == "today"){
    cy.AddDaysToCurrentDate(format,extendDate).then((date)=>{
      cy.setText(date,webElement)
    });
  }else if (textValue.toLowerCase() == "yesterday"){
    cy.AddDaysToCurrentDate(format,-1).then((date)=>{
      cy.setText(date,webElement)
    });
  }else{
    cy.setText(textValue,webElement)
  }
});

Then (/^I set text "([^"]*)?" for element "([^"]*)?" and Enter$/,(textValue, webElement)=>{
  let fullText = textValue
  textValue = fullText.split("|")[0]
  cy.log(textValue)
  let format = fullText.split("|")[1]
  let extendDate = fullText.split("|")[2]
  if (textValue.toLowerCase() == "today"){
    cy.AddDaysToCurrentDate(format,extendDate).then((date)=>{
      cy.setText(date,webElement,true)
    });
  }else if (textValue.toLowerCase() == "yesterday"){
    cy.AddDaysToCurrentDate(format,-1).then((date)=>{
      cy.setText(date,webElement,true)
    });
  }else{
    cy.setText(textValue,webElement,true)
  }
  
});

Then (/^I click on "([^"]*)?"$/,(webElement)=>{
  cy.clickOn(webElement)
});

        
Then (/^I fetch list of movies with "([^"]*)?" tag$/,(expectedStatus)=>{
  let matchCount = 0
  let matchFound = false
  cy.getElement("//a[@class= 'ipc-metadata-list-summary-item__li ipc-metadata-list-summary-item__li--link']").each(($actualStatus)=>{
    
    let eachActualStatus = ($actualStatus.text())    
    if (eachActualStatus == expectedStatus){
      cy.log("Movie Status Matched- " +eachActualStatus)
      matchCount = matchCount + 1
      return matchFound = true
    }else{
      cy.log("Movie Status - " +eachActualStatus)
    }
    if (matchFound){
      cy.clickOn($actualStatus)
    }
    })
    
    cy.log("Total Matched Movie Status - " +matchCount)
});



Then (/^I select "([^"]*)?" item on the "([^"]*)?" list$/,(nthCount, elemList)=>{
  let count = 0
  let wbelmts = pageObject[elemList]
  cy.getElement(wbelmts).each(($actualCount)=>{
    count = count + 1
    if (count == nthCount){
      cy.clickOn($actualCount)
    }
  })
});



And(/^I capture screenshot$/,()=>{
  cy.screenshot()
});


When (/^I send "([^"]*)?" "([^"]*)?" request for "([^"]*)?"$/,(bolValid, requestType, requestURL)=>{
  let expectStatusCode = 0
  if (bolValid.toLowerCase()=="valid"){
    expectStatusCode = 200
  }else if (bolValid.toLowerCase()=="not found"){
    expectStatusCode = 404
  }

  switch (requestType) {
    case "GET":
      cy.getRequestGeneric("POKE API", requestURL,"",expectStatusCode).then((responseBody) => {
        Cypress.env('GetResponse',responseBody)
        return responseBody
      })
      break;
    case "POST":
      
      break;
    default:
      break;
  }

});


Then (/^I validate "([^"]*)?" in response as "([^"]*)?"$/,(key, expValue)=>{
  let response = Cypress.env('GetResponse')
  let actualValue = response[key]
  cy.assertLog(key, actualValue.toString(), "equal", expValue)
});

Given(/^I have a valid berry flavor name$/, () => {
  // This step can be used to set up any preconditions if necessary
});


Then(/^I validate "([^"]*)?" berries in response$/,(flavor) => {
  let response = Cypress.env('GetResponse')
  expect(response.berries).to.be.an('array').that.is.not.empty;
});

And(/^I pick the berry with the highest potency$/, () => {
  let response = Cypress.env('GetResponse');
  let berries = response.berries;

  let highestPotency = 0;
  let highestPotencyBerryName = ''
  let highestPotencyBerryId = ''
  let highestPotencyBerryUrl = ''
  berries.forEach((berry) => {
    if (berry.potency > highestPotency) {
      highestPotency = berry.potency;
      highestPotencyBerryName = berry.berry.name;
      highestPotencyBerryUrl = berry.berry.url;
    }
  });
  highestPotencyBerryId = highestPotencyBerryUrl.split('/').filter(Boolean).pop(); // Extracts the id from the URL
  Cypress.env('highestPotencyBerryName', highestPotencyBerryName);
  Cypress.env('highestPotencyBerryId', highestPotencyBerryId);
});


When(/^I send "([^"]*)?" "([^"]*)?" request for the selected berry "([^"]*)?"$/, (bolValid, requestType,endpoint) => {
  const berryName = Cypress.env('highestPotencyBerryName');
  const requestURL = `${endpoint}${berryName}`;
  cy.log(berryName)
  cy.log(`Request URL: ${requestURL}`);
  cy.getRequestGeneric("POKE API", requestURL,"",200).then((responseBody) => {
    Cypress.env('GetResponse',responseBody)
  });
});

Then (/^I validate "([^"]*)?" and "([^"]*)?" in response$/,(key1, key2) => {
  const response = Cypress.env('GetResponse');
  let actualId = response[key1];
  let actualName = response[key2];
  cy.assertLog(key1, actualId.toString(), "equal", Cypress.env('highestPotencyBerryId'));
  cy.assertLog(key2, actualName.toString(), "equal", Cypress.env('highestPotencyBerryName'));
});

