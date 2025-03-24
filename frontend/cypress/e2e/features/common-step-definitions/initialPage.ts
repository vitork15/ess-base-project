import { Given, Then, When } from "@badeball/cypress-cucumber-preprocessor";

//Acessar músicas em alta
Given("O usuário {string} está autenticado no aplicativo", (user: string) => {
    cy.visit('home');
    cy.get('button').contains('Entre').click();
    cy.get('input[placeholder="Login"]').type(user);
    cy.get('input[placeholder="Senha"]').type('123456');
    cy.get('button').contains('Entrar').click();
});

Given("está na página inicial", () => {
    
});

When("O usuário seleciona a opção {string}", (option: string) => {
    cy.get('button').contains(option).click();
});

Then("O sistema é redirecionado para a página de músicas {string}", (page: string) => {
    cy.url().should('include', page);
});

//Acessar a página inicial deslogado

Given("que o usuário está na página inicial", () => {
    cy.visit('home');
});

Given("o usuário não está autenticado", () => {
    cy.clearCookies();
});

Then("o usuário deve ver uma mensagem o redirecionando para a página de login", () => {
    cy.get('button').contains('Entre').should('exist');
});
