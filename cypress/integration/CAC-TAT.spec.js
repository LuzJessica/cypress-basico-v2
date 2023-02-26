/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() { //test suit
    beforeEach(() => {
        cy.visit('./src/index.html');
      })
    it('verifica o título da aplicação', function() { //test case
    })
    it('preenche os campos obrigatórios e envia o formulário', function() { //exercise 1 and extra 1
        cy.get('input[name="firstName"]').type('Jéssica',{ delay: 0});
        cy.get('input[name="lastName"]').type('Luz');
        cy.get('input[type="email"]').type('jessicaluz@gec.inatel.br');
        cy.get('textarea[name="open-text-area"]').type('Meu primeiro teste de escrita com Cypress');
      //  cy.get('button[type="submit"]').click();
        cy.contains('button','Enviar');
    })
    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() { //extra 2
        cy.get('input[name="firstName"]').type('Jéssica');
        cy.get('input[name="lastName"]').type('Luz');
        cy.get('input[type="email"]').type('jessicaluz');
        cy.get('textarea[name="open-text-area"]').type('Meu primeiro teste de escrita com Cypress');
        cy.get('button[type="submit"]').click();
        cy.get('.error').should('be.visible');
    })
    it('verifica que o campo telefone só aceita números', function() { //extra 3
        cy.get('input[id="phone"]').type('jessica').should('have.value', '');
    })
    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() { //extra 4
        cy.get('input[name="firstName"]').type('Jéssica');
        cy.get('input[name="lastName"]').type('Luz');
        cy.get('input[type="email"]').type('jessicaluz@gec.inatel.br');
        cy.get('input[id="phone-checkbox"]').click();
        cy.get('textarea[name="open-text-area"]').type('Meu primeiro teste de escrita com Cypress');
        cy.get('button[type="submit"]').click();
        cy.get('.error').should('be.visible');
    })
    it('limpa nome, sobrenome, email e telefone', function() { //extra 5
        cy.get('input[name="firstName"]').type('Jéssica').should('have.value','Jéssica');
        cy.get('input[name="firstName"]').clear().should('have.value','');
        cy.get('input[name="lastName"]').type('Luz').should('have.value','Luz');
        cy.get('input[name="lastName"]').clear().should('have.value','');
        cy.get('input[type="email"]').type('jessicaluz@gec.inatel.br').should('have.value','jessicaluz@gec.inatel.br');
        cy.get('input[type="email"]').clear().should('have.value','');
        cy.get('input[id="phone"]').type('910103114').should('have.value', '910103114');
        cy.get('input[id="phone"]').clear().should('have.value', '');
    })
    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function() { //extra 6
        cy.get('button[type="submit"]').click();
        cy.get('.error').should('be.visible');
    })
    it('envia o formuário com sucesso usando um comando customizado', function() { //extra 7
        cy.fillMandatoryFieldsAndSubmit();
        cy.get('.success').should('be.visible');
    })
  })
  