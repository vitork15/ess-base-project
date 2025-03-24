import { Given, Then, When } from "@badeball/cypress-cucumber-preprocessor";

Given("eu estou na página {string}", (page: string) => {
    cy.visit(page);
});
Given("não existe usuário com o login {string}", (user: string) => {
    expect(true)
});
Given("não existe usuário com o e-mail {string}", (email: string) => {
    expect(true)
});
Given("existe usuário com o login {string}", (login: string) => {
    expect(true)
});
Given("eu preencho o campo {string} com {string}", (field : string, value : string) => {
    cy.get(`input[placeholder="${field}"]`).type(value);
});
Given("eu apago o campo {string}", (field : string) => {
    cy.get(`input[placeholder="${field}"]`).clear()
});
Given("estou autenticado como o usuário de login {string} e senha {string}", (login : string, senha : string) => {
    cy.visit('login');
    cy.get(`input[placeholder="Login"]`).type(login);
    cy.get(`input[placeholder="Senha"]`).type(senha);
    cy.get('button').contains('Entrar').click();
});

When("eu seleciono {string}", (option: string) => {
    cy.get('button').contains(option).click();
});
Then("sou encaminhado para a página {string}", (page: string) => {
    cy.location('pathname').should('eq',`/${page}`)
});
Then("aparece a mensagem {string}", (message: string) => {
    cy.contains(message).should('be.visible')
});
Then("o campo {string} é considerado inválido", (field: string) => {
    cy.get(`input[placeholder="${field}"]`).get('input:invalid').should('exist')
});
Then("eu continuo na página {string}", (page: string) => {
    cy.location('pathname').should('eq',`/${page}`)
});
When("não preencho o campo {string}", (field: string) => {
    //do nothing
});
