/// <reference types= "cypress"/>
describe('Lancamentos', () => {

    beforeEach(() => {
        cy.doLogin()
        cy.visit('sgs/totalizer-balances')
    })

    it('Validar linha da tabela', () => {
        cy.contains('tr', ' 1240190-0 ')
            .should('be.visible')
            .and('contain', '5690')
            .and('contain', ' SARFATY ')
    })

    it('Acessar saldo e extrato', () => {
        /* ==== Generated with Cypress Studio ==== */
        cy.get(':nth-child(1) > .cdk-column-action > .box-actions > .btn-detail')
            .click();
        cy.get('.title-page')
            .should('have.text', ' Totalizador de Saldos  chevron_right  Saldo e Extrato\n');
        /* ==== End Cypress Studio ==== */
    })

    it('Deve filtrar por 7 dias', () => {
        cy.saldo()
        cy.contains('Últimos 30 dias')
            .click()
        cy.contains('Últimos 7 dias')
            .click()
        cy.get('table tbody td')
            .should('be.visible')
    })

    it('Deve filtrar por 15 dias', () => {
        cy.saldo()
        cy.contains('Últimos 30 dias')
            .click()
        cy.contains('Últimos 15 dias')
            .click()
        cy.get('table tbody td')
            .should('be.visible')
    })

    it('Deve filtrar por 60 dias', () => {
        cy.saldo()
        cy.contains('Últimos 30 dias')
            .click()
        cy.contains('Últimos 60 dias')
            .click()
        cy.get('table tbody td')
            .should('be.visible')
    })

    it('Deve filtrar por 90 dias', () => {
        cy.saldo()
        cy.contains('Últimos 30 dias')
            .click()
        cy.contains('Últimos 90 dias')
            .click()
        cy.get('table tbody td')
            .should('be.visible')
    })

    it('Deve filtrar por mais antigo', () => {
        cy.saldo()
        cy.contains('Mais recente')
            .click()
        cy.contains('Mais antigo')
            .click()
        cy.get('table tbody td')
            .should('be.visible')
    })

    it('Deve filtrar por entradas', () => {
        cy.saldo()
        cy.contains('button', 'Entrada')
            .click()
        cy.get('table tbody td')
            .should('be.visible')
    })

    it('Deve filtrar por saidas', () => {
        cy.saldo()
        cy.contains('button', 'Saídas')
            .click()
        cy.get('table tbody td')
            .should('be.visible')
    })

    it('Acessr lancamentos futuros', () => {
        cy.saldo()
        cy.contains('span', 'Futuros')
            .click()
        cy.contains(' Saldo Projetado R$ ')
            .should('be.visible')
    })

    it('Validar filtro de 7 dias', () => {
        cy.saldo()
        cy.lancFuturos()
        cy.contains('Últimos 30 dias')
            .click()
        cy.contains('Últimos 7 dias')
            .click()
        cy.get('table tbody td')
            .should('be.visible')
    })

    it('Validar filtro de 15 dias', () => {
        cy.saldo()
        cy.lancFuturos()
        cy.contains('Últimos 30 dias')
            .click()
        cy.contains('Últimos 15 dias')
            .click()
        cy.get('table tbody td')
            .should('be.visible')
    })

    it('Validar filtro de 60 dias', () => {
        cy.saldo()
        cy.lancFuturos()
        cy.contains('Últimos 30 dias')
            .click()
        cy.contains('Últimos 60 dias')
            .click()
        cy.get('table tbody td')
            .should('be.visible')
    })

    it('Validar filtro de 90 dias', () => {
        cy.saldo()
        cy.lancFuturos()
        cy.contains('Últimos 30 dias')
            .click()
        cy.contains('Últimos 90 dias')
            .click()
        cy.get('table tbody td')
            .should('be.visible')
    })

    it('Validar filtro de mais antigo', () => {
        cy.saldo()
        cy.lancFuturos()
        cy.contains('Mais recente')
            .click()
        cy.contains('Mais antigo')
            .click()
        cy.get('table tbody td')
            .should('be.visible')
    })

    it('Validar filtro de entradas', () => {
        cy.saldo()
        cy.lancFuturos()
        cy.contains('button', 'Entradas')
            .click()
        cy.get('table tbody td')
            .should('be.visible')
    })

    it('Validar filtro de por saidas', () => {
        cy.saldo()
        cy.lancFuturos()
        cy.contains('button', 'Saídas')
            .click()
        cy.get('table tbody td')
            .should('be.visible')
    })

    it('Ocultar saldo em lancamentos futuros', () => {
        cy.saldo()
        cy.lancFuturos()
        cy.get('.btn-eye > img')
            .click()
        cy.get('.current-balance > .value')
            .should('have.class', 'hide-balance')
        cy.get('.current-balance > .value')
            .invoke('text')
            .should('match', /^\s*[*-]*\s*$/)

    })

    it('Ocultar saldo em lancamentos recentes', () => {
        cy.saldo()
        cy.get('.btn-eye > img')
            .click()
        cy.get('.current-balance > .value')
            .should('have.class', 'hide-balance')
        cy.get('.current-balance > .value')
            .invoke('text')
            .should('match', /^\s*[*-]*\s*$/)
    })

})

