Cypress.Commands.add('fillMandatoryFieldsAndSubmit',function(){
    cy.get('input[name="firstName"]').type('Jéssica',{ delay: 0});
        cy.get('input[name="lastName"]').type('Luz');
        cy.get('input[type="email"]').type('jessicaluz@gec.inatel.br');
        cy.get('textarea[name="open-text-area"]').type('Meu primeiro teste de escrita com Cypress');
        cy.get('button[type="submit"]').click();
        cy.contains('button','Enviar').click();
})