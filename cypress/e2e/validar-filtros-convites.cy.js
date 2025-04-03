describe('Validar filtros', () => {
    beforeEach(() => {
        cy.doLogin()
    })

    it('Validar lista de usuario', () => {
        cy.get('#containerTable')
            .should('be.visible')
        cy.get('.table-container')
            .should('be.visible')
        cy.get('.table-container tbody tr')
            .should('have.length.greaterThan', 0)
    })

    it('Filtrar por convites enviados', () => {
        cy.get('mat-select[placeholder="Status do convite"]')
            .parent()
            .click()
        cy.contains('span', ' Enviado ')
            .click({ force: true })
        cy.get('.table-container tbody tr', { timeout: 10000 })
            .should('exist')// aguarda a tabela carregar
        cy.contains('span', ' Enviado ')
            .should('be.visible')// Rebusca os elementos da tabela após a atualização
    })


    it('Filtrar por convites concluídos', () => {
        cy.get('mat-select[placeholder="Status do convite"]')
            .parent()
            .click()
        cy.contains('span', ' Concluído ')
            .click({ force: true })
        cy.get('.table-container tbody tr', { timeout: 10000 })
            .should('exist')// Aguarda a tabela atualizar e garantir que pelo menos um item esteja visível
            .should('be.visible')// Itera sobre as linhas da tabela para garantir que todos os convites estão com status "Concluído"
    })

    it('Filtrar por usuarios bloqueados', () => {
        cy.get('mat-select[placeholder="Status do convite"]')
            .parent()
            .click()
        cy.contains('span', ' Bloqueado ')
            .click({ force: true })
        cy.get('.table-container tbody tr', { timeout: 10000 })
            .should('exist')// Aguarda a tabela ser atualizada garantindo que pelo menos um item esteja visível
        cy.contains('span', ' Bloqueado ')
            .should('exist')
    })

    it('Filtrar por convites não enviados', () => {
        cy.get('mat-select[placeholder="Status do convite"]')
            .parent()
            .click()
        cy.contains('span', ' Enviar ')
            .click({ force: true })
        cy.get('.table-container tbody tr', { timeout: 10000 })
            .should('exist')// Aguarda a tabela ser atualizada garantindo que pelo menos um item esteja visível

        cy.contains('span', ' Enviar ')
            .should('exist')
    })

    it('Filtrar por todos os convites', () => {
        cy.get('mat-select[placeholder="Status do convite"]')
            .parent()
            .click()
        cy.contains('span', ' Todos ')
            .click({ force: true })
        cy.get('.table-container tbody tr', { timeout: 10000 })
            .should('exist')// Aguarda a tabela ser atualizada garantindo que pelo menos um item esteja visível

        cy.contains('span', ' Enviar ')
            .should('exist')
        cy.contains('span', ' Concluído ')
            .should('be.visible')
        cy.contains('span', ' Enviado ')
            .should('be.visible')
    })

    it('Filtrar por nome', () => {
        cy.contains('th', 'Nome')
            .click()
        cy.get('input[placeholder="Buscar"]', { timeout: 2000 })
            .type('MA******')
        cy.contains('span', ' OK ')
            .click()
        cy.contains('MA****** RE*****', { timeout: 10000 })
            .should('be.visible')
    })

    it('Preencher campo nome', () => {
        cy.contains('th', 'Nome')
            .click()
        cy.get('input[placeholder="Buscar"]')
            .type('Bianca')
        cy.contains('span', ' OK ')
            .click({ waitForAnimations: false })
        cy.wait(6000)
        cy.contains('th', 'Nome')
            .click()
        cy.get('input[placeholder="Buscar"]')
            .type('Bianca')
        cy.contains('span', ' OK ')
            .click()
        cy.contains('tbody td', ' BI**** BA****** AM*** SI*** ', { timeout: 10000 })
            .should('have.text', ' BI**** BA****** AM*** SI*** ')
    })

    it('Buscar todos cpf/cnpj', () => {
        cy.contains('th', 'CPF/CNPJ', { timeout: 8000 })
            .click()
        cy.contains('span', ' Selecionar tudo ')
            .click({ force: true })
        cy.contains('span', ' OK ')
            .click()
        cy.contains('span', '1 - 20 de 99', { timeout: 10000 })
            .should('be.visible')
    })

    it('Preencher campo cpf/cnpj', () => {
        cy.contains('th', 'CPF/CNPJ', { timeout: 5000 })
            .click()
        cy.get('input[placeholder="Buscar"]')
            .type('04629062564')
        cy.contains('label', '046.290.625-64')
            .click()
        cy.contains('span', ' OK ')
            .click()
        cy.contains('td', ' 046.290.625-64 ', { timeout: 14000 })
            .should('have.text', ' 046.290.625-64 ')
    })

    it('Selecionar todos', () => {
        /* ==== Generated with Cypress Studio ==== */
        cy.get('#mat-mdc-checkbox-0-input')
            .check();
        cy.get('input[type="checkbox"]')
            .should('have.value', 'on');
        /* ==== End Cypress Studio ==== */
    })

})