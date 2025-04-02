/// <reference types= "cypress"/>
describe('Lancamentos', () => {

    beforeEach(() => {
        cy.doLogin()
        cy.visit('sgs/totalizer-balances')

    })

    it('Deve validar linha da tabela', () => {
        cy.contains('tr', ' 1240190-0 ')
            .should('be.visible')
            .and('contain', '5690')
            .and('contain', ' SARFATY ')

    })

    it('Deve acessar saldo e extrato', () => {
        /* ==== Generated with Cypress Studio ==== */
        cy.get(':nth-child(1) > .cdk-column-action > .box-actions > .btn-detail')
            .click();
        cy.get('.title-page')
            .should('have.text', ' Totalizador de Saldos  chevron_right  Saldo e Extrato\n');
        /* ==== End Cypress Studio ==== */
    })

})

Cypress.Commands.add('saldo', () => {
    cy.get(':nth-child(1) > .cdk-column-action > .box-actions > .btn-detail')
        .click();
    cy.get('.title-page')
        .should('have.text', ' Totalizador de Saldos  chevron_right  Saldo e Extrato\n')
})