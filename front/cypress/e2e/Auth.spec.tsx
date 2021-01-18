/// <reference types="cypress" />

describe('Screen Login', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.clearTable('users');
  });

  it('Deve exibir o formulário de cadastro de usuário ao clicar no botão de criar conta', () => {
    cy.get('#add-user').click();
    cy.wait(1000);
    cy.get('#form-add').then((el) => {
      const style = window.getComputedStyle(el[0]);
      expect('1').to.equal(style.opacity);
    });
    cy.get('#form-login').then((el) => {
      const style = window.getComputedStyle(el[0]);
      expect('0').to.equal(style.opacity);
    });
  });

  it('Deve exibir o formulário de login ao clicar no botão de Logar', () => {
    cy.get('#add-user').click();
    cy.get('#login').click({ force: true });
    cy.get('#form-login').then((el) => {
      const style = window.getComputedStyle(el[0]);
      expect('1').to.equal(style.opacity);
    });
    cy.get('#form-add').then((el) => {
      const style = window.getComputedStyle(el[0]);
      expect('0').to.equal(style.opacity);
    });
  });

  describe('Logar', () => {
    it('Deve exibir um erro ao tentar logar com e-mail inválido', () => {
      const emails = ['', 'xx', 'xx@', '@xx.com', 'xx.com', 'x@.com'];
      emails.forEach((email) => {
        if (email !== '') {
          cy.get('#email').type(email);
        }
        cy.get('#sign').click({ force: true });
        cy.get('.Toastify__toast-body').should('contain.text', 'E-mail inválido');
        cy.get('#email').clear();
      });
    });

    it('Deve exibir um erro ao tentar logar informando e-mail válido e senha inválida', () => {
      const passwords = ['', '1', '12', '123', '1234', '12345'];
      cy.get('#email').type('user@example.com');
      passwords.forEach((password) => {
        if (password !== '') {
          cy.get('#password').type(password);
        }
        cy.get('#sign').click({ force: true });
        cy.get('.Toastify__toast-body').should('contain.text', 'Senha inválida');
        cy.get('#password').clear();
      });
    });

    it('Deve retorar o erro da api ao tentar logar com usuário invalido', () => {
      cy.get('#email').type('user@example.com');
      cy.get('#password').type('123456');
      cy.get('#sign').click({ force: true });
      cy.get('.Toastify__toast-body').should('exist');
    });

    it('Deve logar e redicionar para a home com os dados do usuário', () => {
      cy.addUser('User', 'user@user.com', '123456');
      cy.get('#email').type('user@user.com');
      cy.get('#password').type('123456');
      cy.get('#sign').click({ force: true });
      cy.url().should('eq', `${Cypress.config().baseUrl}/`);
      cy.get('ul li:nth-child(1)').should('contain.text', 'User');
      cy.get('ul li:nth-child(2)').should('contain.text', 'user@user.com');
    });
  });

  describe('Cria usuário', () => {
    it('Deve exibir um erro ao tentar criar um usuário com e-mail inválido', () => {
      cy.get('#add-user').click({ force: true });
      const emails = ['', 'xx', 'xx@', '@xx.com', 'xx.com', 'x@.com'];
      emails.forEach((email) => {
        if (email !== '') {
          cy.get('#email-new').type(email);
        }
        cy.get('#create-user').click({ force: true });
        cy.get('.Toastify__toast-body').should('contain.text', 'E-mail inválido');
        cy.get('#email-new').clear();
      });
    });

    it('Deve exibir um erro ao tentar cria um usuário informando e-mail válido e senha inválida', () => {
      cy.get('#add-user').click({ force: true });
      const passwords = ['', '1', '12', '123', '1234', '12345'];
      cy.get('#email-new').type('user@example.com');
      passwords.forEach((password) => {
        if (password !== '') {
          cy.get('#password-new').type(password);
        }
        cy.get('#create-user').click({ force: true });
        cy.get('.Toastify__toast-body').should('contain.text', 'Senha inválida');
        cy.get('#password-new').clear();
      });
    });

    it('Deve exibir um erro ao tentar cria um usuário informando e-mail e senha válidos e nome inválido', () => {
      cy.get('#add-user').click({ force: true });
      const passwords = ['', 'b', 'aa'];
      cy.get('#email-new').type('user@example.com');
      cy.get('#password-new').type('123456');

      passwords.forEach((password) => {
        if (password !== '') {
          cy.get('#name-new').type(password);
        }
        cy.get('#create-user').click({ force: true });
        cy.get('.Toastify__toast-body').should('contain.text', 'Nome inválido');
        cy.get('#name-new').clear();
      });
    });

    it('Deve criar um usuário informando os dados válidos', () => {
      cy.get('#add-user').click({ force: true });
      cy.get('#email-new').type('user@example.com');
      cy.get('#password-new').type('123456');
      cy.get('#name-new').type('João');
      cy.get('#create-user').click({ force: true });
      cy.get('.Toastify__toast-body').should('contain.text', 'Usuário João criado com sucesso!');
    });

    it('Deve retornar erro ao tentar criar o mesmo usuário mais de uma vez', () => {
      cy.get('#add-user').click({ force: true });
      cy.get('#email-new').type('bruno@example.com');
      cy.get('#password-new').type('123456');
      cy.get('#name-new').type('Bruno');
      cy.get('#create-user').click({ force: true });
      cy.get('.Toastify__toast-body').should('contain.text', 'Usuário Bruno criado com sucesso!');

      cy.get('#add-user').click({ force: true });
      cy.get('#email-new').type('bruno@example.com');
      cy.get('#password-new').type('123456');
      cy.get('#name-new').type('Bruno');
      cy.get('#create-user').click({ force: true });
      cy.get('.Toastify__toast-body').should('not.contain.text', 'Usuário Bruno criado com sucesso!');
    });
  });

  describe('Logout', () => {
    it('Deve redicionar para a tela de login quando clicar no botão sair', async () => {
      cy.login('User', 'user@user.com', '123456');
      cy.url().should('eq', `${Cypress.config().baseUrl}/`);
      cy.get('button').click({ force: true });
      cy.url().should('eq', `${Cypress.config().baseUrl}/login`);
    });
  });
});
