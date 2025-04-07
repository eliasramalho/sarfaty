/// <reference types= "cypress"/>

describe('Cadastro de perfil', () => {
    const nome = 'input[placeholder="Digite o nome do perfil"]'
    const gestores = 'input[placeholder="Digite o nome do usuário"]'
    const sim = 'input[value="true"]'
    const nao = 'input[value="false"]'
    // Gera nome único para cada execução
    const timestamp = Date.now()
    const username = `testUser${timestamp}`


    beforeEach(() => {
        cy.doLogin()
        cy.acessarCadastro()
    })

    it('Preencher formulario', () => {
        cy.get(nome)
            .type(username)
        cy.get(sim)
            .click()
        cy.get(gestores)
            .type('RA')
        cy.contains('mat-option', 'Rafaella Nagliati - rafaella.nagliati')
            .should('be.visible')
            .click()
        cy.get('.manager-item')
            .should('be.visible')
    })

    it('Deve cadastrar um perfil de usuario', () => {
        cy.get(nome)
            .type(username)
        cy.get(sim)
            .click()
        cy.get(gestores)
            .type('RA')
        cy.contains('mat-option', 'Rafaella Nagliati - rafaella.nagliati')
            .click()
        cy.get(gestores)
            .type('R')
        cy.contains('mat-option', 'Bartira Rugai - bartira.rugai')
            .should('be.visible')
            .click()
        cy.contains('Próximo')
            .should('be.visible')
            .click()
        /* ==== selecionar todas as areas Leitura ==== */
        cy.get('div > input[type=checkbox]')
            .click()

        cy.contains('Próximo')
            .click()

        cy.get('input[type="text"]')
            .type('A')

        cy.get('div[role="listbox"]', { timeout: 5000 })
            .contains(' Aplicação IT Lean Homolog - pablo.binotto ')
            .click()

        cy.get('div .manager-item')
            .should('exist')

        cy.contains('button', 'Concluir')
            .click()

        cy.get('.infos > h1', { timeout: 5000 })
            .should('be.visible')

    })
})

