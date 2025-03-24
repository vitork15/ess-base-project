import { Given, Then, When } from "@badeball/cypress-cucumber-preprocessor";

//Exibir músicas na seção "Em Alta"

Given("O usuário {string} está autenticado no sistema", (user: string) => {
    cy.visit('home');
    cy.get('button').contains('Entre').click();
    cy.get('input[placeholder="Login"]').type(user);
    cy.get('input[placeholder="Senha"]').type('123456');
    cy.get('button').contains('Entrar').click();
});

Given("Existem músicas suficientes no sistema", () => {
    
});

When("O usuário acessa a página {string}", (page: string) => {
    cy.visit(page);
});

Then("O sistema exibe uma lista com as músicas mais populares", () => {
    cy.getDataCy('musicCard').should('exist'); 
});

Then("Cada música deve conter:O título da música, nome do artista e a capa do álbum", () => {
    
});

//Reproduzir uma música
/*Given O usuário "Maria" está na "emAlta"
And Uma música é exibida em qualquer uma das seções
When O usuário seleciona uma música específica
Then O sistema inicia a reprodução da música selecionada
And A música aparece no player localizado na parte inferior esquerda da tela*/

Given("O usuário {string} está na página {string}", (user: string, page: string) => {
    cy.visit('home');
    cy.get('button').contains('Entre').click();
    cy.get('input[placeholder="Login"]').type(user);
    cy.get('input[placeholder="Senha"]').type('123456');
    cy.get('button').contains('Entrar').click();
    cy.get('button').contains('Em alta').click();
});

Given("Uma música é exibida em qualquer uma das seções", () => {
    cy.getDataCy('musicCard').should('exist');
});

When("O usuário seleciona uma música específica", () => {
    cy.getDataCy('musicCard').first().click();
    cy.getDataCy('musicCard').first().find('h1').invoke('text').then((musicName) => {
        cy.wrap(musicName).as('selectedMusic');
    });

});

Then("O sistema inicia a reprodução da música selecionada", () => {
    cy.get('@selectedMusic').then((selectedMusic) => {
        cy.getDataCy('player').should('contain', selectedMusic);
    });
});

Then("A música aparece no player localizado na parte inferior esquerda da tela", () => {
    
});
