describe('Visao cliente', () => {
    beforeEach(() => {
        cy.doLogin()
        cy.visaoCliente()
    })

    it('Acessar pagina visao-cliente ', () => {
        cy.request({
            url: '/position/sgsAllPosition'
        }).then(response => {
            expect(response.status).to.eq(200)
        })
        cy.title()
            .should('eq', 'Sarfaty')
        cy.contains('h1', 'Selecione o Cliente', { timeout: 5000 })
            .should('have.text', 'Selecione o Cliente')

    })

    it('Buscar por cliente', () => {
        cy.get('input[type="text"]', { timeout: 5000 })
            .type('Ma')
        cy.contains('mat-option', 'MA')
            .should('be.visible')

    })

    it.skip('Selecionar um cliente', () => {
        cy.get('input[type="text"]', { timeout: 5000 })
            .type('Ma')
        cy.contains('mat-option', 'MA')
            .click()
        cy.get('.box-title > h1')
            .should('have.text', 'Carteira de MA***** DE JE*** OL******')

    })

    /* ==== Test Created with Cypress Studio ==== */
    it.skip('Filtrar por periodo', function() {
        /* ==== Generated with Cypress Studio ==== */
        cy.get('#mat-input-0').clear('M')
        cy.get('#mat-input-0').type('MA{enter}')
        cy.get('#mat-option-0 > .mdc-list-item__primary-text').click()
        cy.get('.date-number').click()
        cy.get(':nth-child(1) > :nth-child(1) > .material-symbols-rounded').click()
        cy.get(':nth-child(3) > [data-mat-col="1"] > .mat-calendar-body-cell > .mat-calendar-body-cell-content').click();
        cy.get('h3').click()
        cy.get('h3').should('have.text', 'Nenhum debênture encontrada')
        /* ==== End Cypress Studio ==== */
    })
})
