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

// Comando genérico para navegar e esperar a API responder
Cypress.Commands.add('acessarPagina', (url, alias, endpoint) => {
    cy.visit(url);
    cy.intercept('GET', `**${endpoint}`).as(alias)
    cy.wait(`@${alias}`, { timeout: 20000 })
        .its('response.statusCode').should('eq', 200)
})

Cypress.Commands.add('loginAd', (usuario, senha) => {
    // Intercepta a requisição de login para aguardar sua resposta
    cy.intercept('POST', '**/auth/ad-login').as('loginRequest')
    // Preenche os campos de login
    cy.get('#user')
        .clear().type(usuario)
    cy.get('#password')
        .clear().type(senha, { log: false })
    cy.get('.box-buttons')
        .click()
    // Aguarda a resposta da API de login antes de prosseguir
    cy.wait('@loginRequest', { timeout: 14000 })
        .its('response.statusCode').should('eq', 200)
})


Cypress.Commands.add('doLogin', () => {
    cy.visit('/sgs/login')
    cy.intercept('POST', '**/auth/ad-login').as('loginRequest')
    cy.loginAd('svc.app.itl.homol@sarfaty.local.br', 'rtP1N)$]52-t', { log: false })
    cy.wait('@loginRequest', { timeout: 12000 })
        .its('response.statusCode').should('eq', 200)
})

Cypress.Commands.add('visaoCliente', () => {
    cy.visit('/sgs/wallet')
    cy.acessarPagina('/sgs/wallet', 'visaoCliente', '/sgs/wallet')
})

Cypress.Commands.add('movimentacao', () => {
    cy.visit('/sgs/documentation')
    cy.intercept('GET', '**/sgs/documentation').as('movimentacao')
    cy.wait('@movimentacao')
        .its('response.statusCode').should('eq', 200)
    // cy.contains('h1', 'Movimentação e Documentação de Debentures', { timeout: 5000 })
    //     .should('have.text', 'Movimentação e Documentação de Debentures')
})

Cypress.Commands.add('gestaoContas', () => {
    cy.wait(4000)
    cy.acessarPagina('/sgs/account-management', 'gestaoContas', '/user/data-lake?page=1&limit=3000')
})

Cypress.Commands.add('totalizador', () => {
    cy.visit('/sgs/totalizer-balances')
    cy.intercept('GET', '**/sgs/totalizer-balances').as('totalizador')
    cy.wait('@totalizador')
        .its('response.statusCode').should('eq', 200)
})

Cypress.Commands.add('saldo', () => {
    cy.get(':nth-child(1) > .cdk-column-action > .box-actions > .btn-detail')
        .click();
    cy.get('.title-page', { timeout: 4000 })
        .should('be.visible')
        cy.get('.spinner-overlay', { timeout: 20000 })
        .should('not.exist');
})

Cypress.Commands.add('lancFuturos', () => {
    cy.contains('span', 'Futuros')
        .click()
    cy.contains(' Saldo Projetado R$ ')
        .should('be.visible')
        cy.get('.spinner-overlay', { timeout: 20000 })
        .should('not.exist');
})

Cypress.Commands.add('insertUser', () => {
    cy.get('input[type="text"]')
        .type('59489244406{enter}')
    cy.contains(' Filtro: 594.892.444-06 ', { timeout: 9000 })
        .should('be.visible')
    cy.contains('Selecionar período')
        .click()
})
