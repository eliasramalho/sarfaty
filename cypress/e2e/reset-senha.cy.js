/// <reference types= "cypress"/>
// cypress/e2e/resetPassword.cy.js
describe.skip('Reset de Senha', () => {

  beforeEach(() => {
    cy.viewport(1440, 900)
    cy.visit('/logged-area/login')
    cy.get('input[formcontrolname="cpfCnpj"]')
      .type('11054688000109')
    cy.wait(1000)
    cy.contains('button', ' Esqueci minha senha ')
      .click()
  })

  it('usuario nao encontrado', () => {
    cy.get('input[formcontrolname="cpfCnpj"]')
      .type('92984121007')
    cy.wait(1000)
    cy.contains('button', ' Esqueci minha senha ')
      .click()
    cy.get('.mat-mdc-simple-snack-bar > .mat-mdc-snack-bar-label')
      .should('have.text', ' Captcha inválido!\n')
  })


  it('Deve exibir erro quando o campo está vazio', () => {
    cy.get('button[type="submit"]')
      .click();
    cy.get('input[name="email"]:invalid')
    .should('have.length', 1)
  })

  it('Deve redefinir senha via link de email com sucesso', () => {
    cy.get('input[name="email"]')
      .type('usuario@valido.com')
    cy.get('button[type="submit"]')
      .click();

    // Simulação de navegação até o link de redefinição de senha (modifique conforme necessário)
    cy.visit('/reset-link-simulacao');
    cy.get('input[name="newPassword"]')
      .type('novaSenhaValida');
    cy.get('input[name="confirmPassword"]')
      .type('novaSenhaValida');
    cy.get('button[type="submit"]')
      .click();
    cy.contains('Senha redefinida com sucesso')
      .should('be.visible');
    cy.url()
      .should('include', '/login');
  })

  it('Deve exibir erro com link expirado', () => {
    cy.get('input[name="email"]')
      .type('usuario@valido.com');
    cy.get('button[type="submit"]')
      .click();
    // Simulação de link expirado
    cy.visit('/reset-link-expirado');
    cy.get('input[name="newPassword"]')
      .type('novaSenhaValida');
    cy.get('input[name="confirmPassword"]')
      .type('novaSenhaValida');
    cy.get('button[type="submit"]')
      .click();
    cy.contains('Link expirado')
      .should('be.visible');
  })

})
