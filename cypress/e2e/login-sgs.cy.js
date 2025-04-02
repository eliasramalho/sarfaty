/// <reference types= "cypress"/>
// cypress/e2e/sgs.cy.js

describe('Validar login SGS', () => {
  const user = '#user'
  const password = '#password'
  const accessAccount = '.box-buttons'

  beforeEach(() => {
    cy.viewport(1440, 900)
    cy.visit('/sgs/login')
    cy.get(user).clear()
    cy.get(password).clear()
  })

  it('Acessar pagina incial', () => {
    cy.request({
      url: '/'
    }).then(response => {
      expect(response.status).to.eq(200)
    })
    cy.title()
      .should('eq', 'Sarfaty')
  })

  it('login com campos em branco', () => {
    cy.get(user).click()
    cy.get(password).click()
    cy.get(accessAccount).click()
    cy.get(':nth-child(3) > .error-message')
      .should('have.text', ' *Este campo é obrigatório! ')
    cy.get(':nth-child(6) > .error-message')
      .should('have.text', ' *Este campo é obrigatório! ')
  })

  it('Login com email invalido', () => {
    cy.get(user)
      .type('teste.com.br')
    cy.get(password)
      .type('password', { log: false })
    cy.get(accessAccount)
      .click()
    cy.get('.error-message')
      .should('have.text', ' *Endereço de e-mail inválido. ')
  })

  it('Login com credenciais invalidas', () => {
    cy.get(user)
      .type('svc.app.itl.homol@sarfaty.local.br')
    cy.get(password)
      .type('passwordFalse', { log: false })
    cy.get(accessAccount)
      .click()
      cy.wait(7000)
    cy.get('.mat-mdc-simple-snack-bar > .mat-mdc-snack-bar-label')
      .invoke('text')
      .then((text) => {
        expect(text.trim()).to.eq('Usuário ou Senha incorreto.');
      })
  })

  it('Login com sucesso', () => {
    cy.loginAd('svc.app.itl.homol@sarfaty.local.br', 'rtP1N)$]52-t')
    cy.wait(7000)
  })

})

// describe('Validar envio de convites', () => {
 

//   it('Selecionar um usuario e enviar convite', () => {
//     cy.get('#mat-mdc-checkbox-2-input')
//       .click()
//     cy.get('.container-select-all > .mdc-button > .mdc-button__label')
//       .click()
//     cy.get('section[class="title-section success"]')
//       .should('have.text', ' Convite enviado close')
//   })

//   it('Selecionar multiplos usuarios e enviar convite', () => {
//     cy.get('#mat-mdc-checkbox-2-input')
//       .click()
//     cy.get('#mat-mdc-checkbox-4-input')
//       .click()
//     cy.wait(1000)
//     cy.get('.container-select-all > .mdc-button > .mdc-button__label')
//       .click()
//     cy.get('section[class="title-section success"]')
//       .should('have.text', ' Convite enviado close')
//   })


// })




