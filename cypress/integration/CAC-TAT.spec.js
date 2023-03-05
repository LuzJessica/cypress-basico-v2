/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() { //test suit
    const THREE_SECONDS_IN_MS = 3000;
    beforeEach(() => {
        cy.visit('./src/index.html');
      })
    it('verifica o título da aplicação', function() { //test case
    })
    it('preenche os campos obrigatórios e envia o formulário', function() { //exercise 1 and extra 1
        cy.clock();
        cy.get('input[name="firstName"]').type('Jéssica',{ delay: 0});
        cy.get('input[name="lastName"]').type('Luz');
        cy.get('input[type="email"]').type('jessicaluz@gec.inatel.br');
        cy.get('textarea[name="open-text-area"]').type('Meu primeiro teste de escrita com Cypress');
        cy.contains('button','Enviar').click();
        cy.get('.success').should('be.visible');
        cy.tick(THREE_SECONDS_IN_MS);
        cy.get('.success').should('not.be.visible');
    })
    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() { //extra 2
        cy.clock();
        cy.get('input[name="firstName"]').type('Jéssica');
        cy.get('input[name="lastName"]').type('Luz');
        cy.get('input[type="email"]').type('jessicaluz');
        cy.get('textarea[name="open-text-area"]').type('Meu primeiro teste de escrita com Cypress');
        cy.contains('button','Enviar').click();
        cy.get('.error').should('be.visible');
        cy.tick(THREE_SECONDS_IN_MS);
        cy.get('.error').should('not.be.visible');
    })
    it('verifica que o campo telefone só aceita números', function() { //extra 3
        cy.get('input[id="phone"]').type('jessica').should('have.value', '');
    })
    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() { //extra 4
        cy.clock();
        cy.get('input[name="firstName"]').type('Jéssica');
        cy.get('input[name="lastName"]').type('Luz');
        cy.get('input[type="email"]').type('jessicaluz@gec.inatel.br');
        cy.get('input[id="phone-checkbox"]').check();
        cy.get('textarea[name="open-text-area"]').type('Meu primeiro teste de escrita com Cypress');
        cy.contains('button','Enviar').click();
        cy.get('.error').should('be.visible');
        cy.tick(THREE_SECONDS_IN_MS);
        cy.get('.error').should('not.be.visible');


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
        cy.contains('button','Enviar').click();
        cy.get('.error').should('be.visible');
    })
    it('envia o formuário com sucesso usando um comando customizado', function() { //extra 7
        cy.clock();
        cy.fillMandatoryFieldsAndSubmit();
        cy.get('.success').should('be.visible');
        cy.tick(THREE_SECONDS_IN_MS);
        cy.get('.success').should('not.be.visible');
    })
    it('seleciona um produto (YouTube) por seu texto', function() { //Aula 18 Ex1
        cy.get('select').select('YouTube');
    })
    it('seleciona um produto (Mentoria) por seu valor (value)', function() { //extra 1
        cy.get('select').select('mentoria');
    })
    it('seleciona um produto (Blog) por seu índice', function() { //extra 1
        cy.get('select').select(1);
    })
    it('marca o tipo de atendimento "Feedback"', function() { //Aula 22 Ex1
        cy.get('input[type="radio"][value="feedback"]').check();
    })
    it('marca cada tipo de atendimento', function() { //Aula 22 Ex1
        cy.get('input[type="radio"]').should('have.length',3).each(function($radio){
            cy.wrap($radio).check();
            cy.wrap($radio).should('be.checked');   
        });
    })
    it('marca ambos checkboxes, depois desmarca o último', function() { //Aula 25 Ex1
        cy.get('input[type="checkbox"]').check();
        cy.get('input[type="checkbox"]').last().uncheck();
    })
    it('seleciona um arquivo da pasta fixtures', function() { //Aula 28 Ex1
        cy.get('input[type="file"]').should('not.have.value').selectFile('cypress/fixtures/example.json')
        .should(function($input){
            expect($input[0].files[0].name).to.equal('example.json')
        });
    })
    it('seleciona um arquivo simulando um drag-and-drop', function() { //extra 1
        cy.get('input[type="file"]').should('not.have.value').selectFile('cypress/fixtures/example.json',{ action: 'drag-drop'})
        .should(function($input){
            expect($input[0].files[0].name).to.equal('example.json')
        });
    })
    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function() { //extra 1
        cy.fixture('example.json').as('sampleFile');
        cy.get('input[type="file"]').selectFile('@sampleFile').should(function($input){
            expect($input[0].files[0].name).to.equal('example.json')
        });
    })
    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function() { //Aula 32 ex1
        cy.get('#privacy a').should('have.attr', 'target', '_blank');
    })
    it('acessa a página da política de privacidade removendo o target e então clicando no link', function() {//extra 1
        cy.get('#privacy a').invoke('removeAttr', 'target').click();
        cy.contains('Talking About Testing').should('be.visible');
    })
    it('exibe e esconde as mensagens de sucesso e erro usando o .invoke', function() {
        cy.get('.success')
          .should('not.be.visible')
          .invoke('show')
          .should('be.visible')
          .and('contain', 'Mensagem enviada com sucesso.')
          .invoke('hide')
          .should('not.be.visible')
        cy.get('.error')
          .should('not.be.visible')
          .invoke('show')
          .should('be.visible')
          .and('contain', 'Valide os campos obrigatórios!')
          .invoke('hide')
          .should('not.be.visible')
      })
      it('preenche a area de texto usando o comando invoke', function() {
        const longText = Cypress._.repeat('0123456789', 20);
        cy.get('textarea[name="open-text-area"]').invoke('val',longText).should('have.value', longText);
      })
      it('faz uma requisição HTTP', function() {
        cy.request('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html')
        .should(function(response){
            console.log(response);
            const{status, statusText, body} = response
            expect(status).to.equal(200)
            expect(statusText).to.equal('OK')
            expect(body).to.include('CAC TAT')
        });
      })
      it.only('encontrando o gato', function() {
        cy.get('#cat').should('not.be.visible').invoke('show').should('be.visible');
        cy.get('#title').invoke('text', 'CAT TAT');
        cy.get('#subtitle').invoke('text', 'Eu 💚 Gatos');
      })

  })
  