import { Given, Then, When } from "@badeball/cypress-cucumber-preprocessor";

//Exibir músicas na seção "Em Alta"


Given("O usuário {string} foi cadastrado no sistema", (user: string) => {
    cy.visit('home');
    cy.get('button').contains('Entre').click();
    cy.get('input[placeholder="Login"]').type(user);
    cy.get('input[placeholder="Senha"]').type('123456');
    cy.get('button').contains('Entrar').click();
});

Given("O usuário está na página de {string}", (page: string) => {
    cy.get('button').contains('Biblioteca').click()
})

When("O usuário seleciona para adicionar uma nova playlist", () => {
    cy.get('[data-cy="addPL"]').click()
})

Then("uma nova playlist é adicionada na biblioteca do usuário", () => {
    cy.get('[data-cy="playlist"]').should("exist")
    cy.get('[data-cy="optionPL"]').click()
    cy.get('[data-cy="deletePL"]').click()

})

Then("O usuário continua na página de {string}", () => {
    cy.url().should("include", "/biblioteca");
})

Given("O usuário tem a playlist {string}", (name:string) => {
    cy.get('[data-cy="addPL"]').click()
    cy.get('[data-cy="optionPL"]').click()
    cy.get('[data-cy="editPL"]').click()
    cy.get('[data-cy="modalNamePL"]').type(name)
    cy.get('[data-cy="saveModalPL"]').click()
})

When("O usuário seleciona para remover a playlist {string}", (name:string) => {
    cy.get('[data-cy="optionPL"]').click()
    cy.get('[data-cy="deletePL"]').click()
})

Then("O usuário não vê nenhuma playlist", () =>{
    cy.get('[data-cy="playlist"]').should("not.exist")
})

When("O usuário seleciona para editar a playlist {string}", (name:string) => {
    cy.get('[data-cy="optionPL"]').click()
    cy.get('[data-cy="editPL"]').click()
})

When("O usuário escolhe o nome {string}", (name:string) => {
    cy.get('[data-cy="modalNamePL"]').clear().type(name)
    cy.get('[data-cy="saveModalPL"]').click()
})

Then("O usuário ve a playlist {string}", (name:string) => {
    cy.get('[data-cy="namePL"]').should("have.text", name)
    cy.get('[data-cy="optionPL"]').click()
    cy.get('[data-cy="deletePL"]').click()
})



