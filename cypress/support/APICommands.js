
Cypress.Commands.add("getRequestGeneric", (APIName, url, header, expectedStatusCode) => {
    
    cy.request({
        method: "GET",
        url: url,
        failOnStatusCode: false,
        headers: header,

    })
        .then((response) => {
            cy.assertLog(APIName, response.status, "equal", expectedStatusCode)
            cy.wrap(response.body)
        })

})