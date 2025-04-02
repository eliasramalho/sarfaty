/// <reference types= "cypress"/>

describe.skip('Totalizador de saldos', ()=>{

    beforeEach(() => {
        cy.doLogin()
        cy.totalizador()
    })

    it('Deve buscar por numero de conta', ()=>{

    })

})