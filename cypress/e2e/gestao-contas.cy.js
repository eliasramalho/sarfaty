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
            .should('have.text', 'Nome: MA****** RE***** CPF/CNPJ: 594.892.444-06 E-mail: hmlprojetos@gruposarfaty.com.br ')
    })

    it('Deve selecionar o cliente da lista', ()=>{
        cy.get('input[type=text]', {timeout:4000})
        .type('59489244406')
        cy.get('div[role="listbox"]')
        .click()
        cy.get('table tbody td')
        .should('have.text', ' MA****** RE*****  hmlprojetos@gruposarfaty.com.br  594.892.444-06 000002-6')

    })
    it('Deve criar uma conta automaticamante', ()=>{
        cy.get('input[type=text]')
        .type('59489244406')
        cy.get('div[role="listbox"]')
        .click()
        cy.contains('button', ' Automático ')
        .click()

    })


})

