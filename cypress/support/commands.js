// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('fillMandatoryFieldsAndSubmit', (data = {
    nome: 'Livia', 
    sobrenome: 'Ramalho',
    email: 'livia@teste.com'
}) =>{
    const longText = Cypress._.repeat('ashdjkahsdjkahsdjkasdkasdj', 20)
    cy.get('[name="firstName"]').type(data.nome)
    cy.get('[name="lastName"]').type(data.sobrenome)
    cy.get('#email').type(data.email)
    cy.get('[name="open-text-area"]').type(longText, {delay: 0})
    cy.get('button[type="submit"]').click()

})