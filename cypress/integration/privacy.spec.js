Cypress._.times(5, function(){
    it.only('testa a página da política de privacidade de forma independente', function() {//extra 1
        cy.visit('./src/privacy.html'); 
        cy.contains('#title', 'CAC TAT - Política de privacidade');
        cy.contains('#white-background','Não salvamos dados submetidos no formulário da aplicação CAC TAT. Utilzamos as tecnologias HTML, CSS e JavaScript, para simular uma aplicação real. No entanto, a aplicação é um exemplo, sem qualquer persistência de dados, e usada para fins de ensino. Talking About Testing')
    })
})