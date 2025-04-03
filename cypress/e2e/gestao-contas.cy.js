/// <reference types= "cypress"/>

describe('Gestao de contas', () => {

    beforeEach(() => {
        cy.doLogin()
        cy.gestaoContas()
    })

    it('Deve exibir lista de cliente', () => {
        cy.get('input[type=text]')
            .type('59489244406')

        cy.get('div[role="listbox"]')
            .should('be.visible')
    })

    it('Deve selecionar o cliente da lista', () => {
        cy.get('input[type=text]', { timeout: 4000 })
            .type('59489244406')
        cy.get('div[role="listbox"]')
            .click()
        cy.get('table tbody td')
            .should('be.visible')

    })
    it('Deve criar uma conta automaticamante', () => {
        cy.get('input[type=text]', { timeout: 4000 })
            .type('59489244406')
        cy.get('div[role="listbox"]')
            .click()
        cy.contains('button', ' Automático ')
            .click()
        cy.contains('Conta criada com sucesso.', { timeout: 8000 })
            .should('be.visible')

    })


})

