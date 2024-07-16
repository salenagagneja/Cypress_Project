import 'cypress-wait-until';
import cucumberStep from 'cypress-cucumber-preprocessor/lib/resolveStepDefinition';
const dayjs = require('dayjs')

import { pageObject } from "../fixtures/pageobjects/pageObject.js";

// require('@zebrunner/javascript-agent-cypress/lib/commands/commands');

/**
 * Function Name : OpenWebsite
 * Function Description : This function launch the estorefront based on country of execution
 * Input Parameter : -
 * Author : Salena Gagneja

 */
Cypress.Commands.add("OpenWebsite", () => {

    Cypress.on('uncaught:exception', (_err, _runnable) => {
        return false
    })
    cy.clearCookies()
    cy.clearLocalStorage()
    URL = "https://www.imdb.com"
    cy.visit(URL)
    cy.log('Navigate to :' + " " +  URL)
})


/**
 * Function Name : clickOn
 * Function Description : This function click by element
 * Input Parameter : locator to element (id, xpath, css)
 * Author : Salena Gagneja
 
 */
Cypress.Commands.add("clickOn", (elmt) => {
    
    if (typeof elmt === 'object') {
        cy.wrap(elmt).first().click({force: true})
    } else if (typeof elmt === 'string') {
        let wbelmt = pageObject[elmt]
        const element = cy.getElement(wbelmt).first().should('not.be.disabled')
        if (element !== null) {
            element.trigger('mouseover', {force: true}).click({force: true})
        } else {
            cy.log('Null Element')
        }
    }
})

/**
 * Function Name : setText
 * Function Description : This function set value to element
 * Input Parameter : locator to element (id, xpath, css), value
 * Author : Salena Gagneja
 */
Cypress.Commands.add("setText", (textValue, elmt, enter) => {
    
    let wbelmt = pageObject[elmt]
    var element = cy.getElement(wbelmt)
    if (element !== null) {
        if (enter){
            element.clear({force: true}).type(textValue).type('{enter}')
        }else{
            element.clear({force: true}).type(textValue)
        }
    } else {
        cy.log('Element Not Found - ' + wbelmt)
    }
})

/**
 * Function Name : getElement
 * Function Description : This function return element
 * Input Parameter : locator to element (id, xpath, css)
 * Author : Salena Gagneja
 */
Cypress.Commands.add("getElement", (elmt) => {
    // let elmt = pageObject[webElement]
    if (elmt == ""){
        cy.assertLog("Element ", elmt,"not equal","")
    }
    cy.log(elmt)
    let sLocatorType = elmt.trim().charAt(0)
    // updated getElement method by removing visiblity checks
    switch (sLocatorType) {
        case '/':
            return cy.xpath(elmt)
            break;
        case '(':
            return cy.xpath(elmt)
            break;    
        case '^':
            elmt = elmt.replace('^', '')
            return cy.contains(elmt)
            break;
        default:
            return cy.get(elmt)
            break;
    }
})

/**
 * Function Name : assertLog
 * Function Description : This function asserts that expected and actual results meet condition and logs message
 * Input Parameter : errorMsg - Log message with name of the tested field
 *                   actual - Actual data that we are going to test
 *                   condition - Condition that actual and expected fields should meet
 *                   expected - Expected data that we are expeting to get from aplication
 * Author : Salena Gagneja
 */
Cypress.Commands.add('assertLog', (errorMsg, actual, condition, expected) => {

    cy.log(errorMsg+" --> "+"Actual - "+actual+" ,  Expected - "+expected)
    switch (condition.toLowerCase()) {
        case "equal":
            expect(actual, errorMsg).to.equal(expected)
            break
        case "not equal":
            expect(actual, errorMsg).to.not.equal(expected)
            break
        case "include":
            expect(actual, errorMsg).to.include(expected)
            break
        case "contain text":
            expect(actual, errorMsg).to.contain.text(expected)
            break
        case "not include":
            expect(actual, errorMsg).to.not.include(expected)
            break
        case "disabled":
            expect(actual, errorMsg).to.be.disabled
            break
        case "not disabled":
            expect(actual, errorMsg).to.not.be.disabled
            break
        case "visible":
            expect(actual, errorMsg).to.be.visible
            break
        case "not visible":
            expect(actual, errorMsg).not.to.be.visible
            break
        case "true":
            expect(actual, errorMsg).to.be.true
            break
        case "false":
            expect(actual, errorMsg).to.be.false
            break
        case "greater than":
            expect(actual, errorMsg).to.be.above(expected)
            break
        case "greater than equal":
            expect(actual, errorMsg).to.be.at.least(expected)
            break
        case "less than":
            expect(actual, errorMsg).to.be.below(expected)
            break
        case "less than equal":
            expect(actual, errorMsg).to.be.at.most(expected)
            break
        case "exist":
            expect(actual, errorMsg).to.exist
            break
        case "have class":
            expect(actual, errorMsg).to.have.class(expected)
            break
        case "not have class":
            expect(actual, errorMsg).to.not.have.class(expected)
            break
        case "have value":
            expect(actual, errorMsg).to.have.value(expected)
            break
        case "checked":
            expect(actual, errorMsg).to.be.checked
            break
        case "not checked":
            expect(actual, errorMsg).to.not.be.checked
            break
        case "color":
            expect(actual, errorMsg).to.have.css("color", expected)
            break
        case "border color":
            expect(actual, errorMsg).to.have.css("border-color", expected)
            break
        case "background color":
            expect(actual, errorMsg).to.have.css("background-color", expected)
            break
        case "have attr":
            expect(actual, errorMsg).to.have.property(expected)
            break
        case "not have attr":
            expect(actual, errorMsg).to.not.have.property(expected)
            break
        case "not empty":
            expect(actual, errorMsg).not.be.empty
            break
        case "have descendant":
            expect(actual, errorMsg).to.have.descendants(expected)
            break
        case "have length":
            expect(actual, errorMsg).to.have.length(expected)
            break
        case "one of":
            expect(actual, errorMsg).to.be.oneOf(expected)
            break
    }
})

  /**
 * Function Name : addDaysToCurrentDate
 * Function Description : This function rreturn the date in required format after adding specified days.
 * Input Parameter : - datetimeformat
 * Author : Salena Gagneja
 */
   Cypress.Commands.add("AddDaysToCurrentDate", (datetimeformat, extendedday) => {    
    const dateTimeStamp = dayjs().add(extendedday, 'day').format(datetimeformat)
    cy.wrap (dateTimeStamp.toString())
})
