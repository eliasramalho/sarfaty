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

Cypress.Commands.add('loginAd', (usuario, senha) => {
    cy.get('#user')
    .clear()
    .type(usuario)
    cy.get('#password')
    .clear()
    .type(senha, { log: false })
    cy.get('.box-buttons')
    .click()
    // cy.intercept('GET', 'https://sarfaty-backend.internal.gruposarfaty.com.br/auth/ad-login', {

    // }).as('getLogin')
    // cy.wait('@getLogin', { timeout: 9000 })
    
})

Cypress.Commands.add('doLogin', () =>{
    cy.visit('/sgs/login')
    cy.loginAd('svc.app.itl.homol@sarfaty.local.br', 'rtP1N)$]52-t',{log:false})
    cy.request({
        url: '/'
      }).then(response => {
        expect(response.status).to.eq(200)
      })
      cy.wait(14000)
    
    
    cy.url()
    .should('eq', 'https://portal-dev.internal.gruposarfaty.com.br/sgs/access-invitation')
})

Cypress.Commands.add('visaoCliente', () => {
    cy.visit('/sgs/wallet')
    cy.contains('h1', 'Selecione o Cliente', {timeout:5000})
        .should('be.visible')
})

Cypress.Commands.add('movimentacao', () => {
    cy.visit('/sgs/documentation')
cy.contains('h1', 'Movimentação e Documentação de Debentures', {timeout:5000})
.should('have.text', 'Movimentação e Documentação de Debentures')
})

Cypress.Commands.add('gestaoContas', () => {
    cy.visit('/sgs/account-management')
    cy.contains('h4', 'Gestão de Contas', {timeout:5000})
        .should('have.text', ' Gestão de Contas\n')
})

Cypress.Commands.add('totalizador', () => {
    cy.visit('/sgs/totalizer-balances')
    cy.contains('h4', 'Totalizador de Saldos', {timeout:5000})
        .should('have.text', 'Totalizador de Saldos')
})
