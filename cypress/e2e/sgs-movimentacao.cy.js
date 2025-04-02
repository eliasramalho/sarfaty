/// <reference types= "cypress"/>
describe('Validar filtros', () => {
    beforeEach(() => {
        cy.doLogin()
        cy.movimentacao()
        // cy.get('.mat-mdc-select-trigger')
        //     .click({ force: true })
    })

    it('Filtrar por cliente', () => {
        cy.get('input[type="text"]')
            .type('59489244406{enter}')
        cy.contains(' Filtro: 594.892.444-06 ', { timeout: 10000 })
            .should('have.text', ' Filtro: 594.892.444-06 ')
    })

    it('Filtro periodo ultimos 7 dias ', () => {
        cy.insertUser()
        cy.contains(' Últimos 7 dias ')
            .click()
        cy.get('h3', { timeout: 10000 })
            .should('have.text', 'Nenhum resultado encontrado neste período')
    })

    it('Filtro periodo ultimos 15 dias ', () => {
        cy.insertUser()
        cy.contains('Últimos 15 dias')
            .click()
        cy.get('h3', { timeout: 10000 })
            .should('have.text', 'Nenhum resultado encontrado neste período')
    })

    it('Filtro periodo ultimos 30 dias ', () => {
        cy.insertUser()
        cy.contains('Últimos 30 dias')
            .click()
        cy.get('.expansion-section', { timeout: 10000 })
            .should('be.visible')
    })

    it('Filtro periodo ultimos 60 dias ', () => {
        cy.insertUser()
        cy.contains('Últimos 60 dias')
            .click()
        cy.get('.expansion-section', { timeout: 10000 })
            .should('be.visible')
    })

    it('Filtro periodo mes completo ', () => {
        cy.insertUser()
        cy.contains(' Mês completo ')
            .click()
        cy.contains('button', ' JAN. ')
            .click()
        cy.get('.expansion-section', { timeout: 10000 })
            .should('be.visible')
    })

    it.skip('Filtro Período personalizado ', () => {
        cy.insertUser()
        cy.contains(' Período personalizado ')
            .click()
        cy.contains('7')
            .click()
        cy.contains('3', { timeout: 2000 })
            .click({ force: true })
        cy.get('.range-data-button > p')
            .should('be.visible')
        cy.get('.expansion-section', { timeout: 10000 })
            .should('be.visible')
    })

})
