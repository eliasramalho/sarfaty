/// <reference types= "cypress"/>
// cypress/e2e/login-cliente.cy.js

describe.skip('Login do usuario', () => {
  const cpf = '#mat-input-0'
  const senha = '#mat-input-1'
  const entrar = 'button[type=submit]'

  beforeEach(() => {
    cy.viewport(1440, 900)
    cy.visit('/logged-area/login')
    cy.get('#user')
      .should('be.visible') //  URL da página de Login

  })

  it('Login com credenciais validas', () => {
    cy.get(cpf

    ).type('02365796000101')
    cy.get(senha)
      .type('134679', { log: false })
    cy.get(entrar)
      .click()

    cy.intercept('GET', '**/api/emails?recipient=elias.silva@itlean.com.br')
      .as('emailIntercept')
    //     cy.intercept('/auth').as('captcha')
    //   cy.wait('@captcha')

    cy.wait('@emailIntercept').then((intercept) => {
      const emailBody = intercept.response.body
      const tokenRegex = /\b\d{4}\b/
      const tokenMatch = emailBody.match(tokenRegex)

      expect(tokenMatch).to.not.be.null
      const token = tokenMatch[0]

      cy.get('#digito1')
        .type(token)
      cy.get('button[type=submit]')
        .click()
    })

  })

  it('Login com campos em branco', () => {
    cy.get(cpf)
      .click()
    cy.get(senha)
      .click()
    cy.get(cpf)
      .click()
    cy.get('#mat-mdc-error-0')
      .should('have.text', '*CPF / CNPJ é obrigatório')
    cy.get('#mat-mdc-error-1')
      .should('have.text', ' *A senha é obrigatória ')
  })

  it('Credenciais invalidas', () => {
    cy.get(cpf)
      .type('02365796000101')
    cy.get(senha)
      .type('credenciais invalidas')
    cy.get(entrar)
      .click()
    cy.get('.mat-mdc-simple-snack-bar > .mat-mdc-snack-bar-label')
      .should('have.text', 'Cre')
  })



})





Cypress.Commands.add('varificarUser', () => {
  cy.request({
    method: 'GET',
    url: 'https://sarfaty-backend.internal.gruposarfaty.com.br/user?page=1&limit=30',
  }).then((response) => {
    expect(response.status).to.eq(200);
    expect(response.body).to.have.property('data'); // Garante que há usuários na resposta

    // Lista de usuários dentro de response.body.data
    const usuarios = response.body.data;

    // Busca pelo usuário "Elias Silva"
    const usuarioElias = usuarios.find(obj =>
      obj.user.firstName === 'Elias' && obj.user.lastName === 'Silva'
    );

    // Se o usuário for encontrado, captura o ID e realiza o DELETE
    if (usuarioElias && usuarioElias.user.id) {
      const userId = usuarioElias.user.id;
      cy.log(`Usuário encontrado: ${userId}`);

      cy.request({
        method: 'DELETE',
        url: `https://sarfaty-backend.internal.gruposarfaty.com.br/user/${userId}`,
      }).then((deleteResponse) => {
        expect(deleteResponse.status).to.eq(200);
        cy.log('Usuário Elias Silva deletado com sucesso.');
      });
    } else {
      cy.log('Usuário Elias Silva não encontrado. Nenhuma ação necessária.');
    }
  });

})