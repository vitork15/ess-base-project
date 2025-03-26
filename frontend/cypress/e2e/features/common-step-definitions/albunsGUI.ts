import { Given, Then, When } from "@badeball/cypress-cucumber-preprocessor";

Given("estou autenticado como artista de login {string} e senha {string}", (login : string, senha : string) => {
    cy.visit('artistlogin');
    cy.get(`input[placeholder="Login"]`).type(login);
    cy.get(`input[placeholder="Senha"]`).type(senha);
    cy.get('button').contains('Entrar').click();
});

Given("eu estou na página de perfil", () => {
    cy.get('button').contains('Perfil').click();
});

Given("eu estou na página de adicionar album", () => {
    cy.get('button').contains('Perfil').click();
    cy.get('button').contains('Adicionar álbum').click();
});

Given("existe um lançamento {string}", (texto:string) => {
    cy.get('h3').contains("Nome: "+ texto).should('exist')
});

When("eu informo que quero atualizar o lançamento {string}", (name:string) => {
    cy.get('h3').contains("Nome: "+ name).click()
});

When("eu informo que quero adicionar 1 nova música do gênero {string} e subgênero {string}", (genero:string, subgenero:string) => {
    cy.get(`input[placeholder="genero"]`).type(genero);
    cy.get(`input[placeholder="subgenero"]`).type(subgenero);
});

When("eu informo que quero adicionar 3 novas músicas do gênero {string} e subgênero {string}", (genero:string, subgenero:string) => {
    cy.get('button').contains('"+"').click();
    cy.get('button').contains('"+"').click();
    cy.get(`input[placeholder="genero"]`).type(genero);
    cy.get(`input[placeholder="subgenero"]`).type(subgenero);
});

When("cadastro {string} como título do lançamento", (nome:string) =>{
    cy.get(`input[placeholder="album"]`).type(nome);
    cy.get('button').contains('Continuar').click();
});

When("cadastro {string} como título da música {string}", (nome:string, num:string) =>{
    cy.get(`input[placeholder="Nome ${num}"]`).type(nome);
});

When("eu confirmo o lançamento das músicas", () => {
    cy.get(`button`).contains('Lançar').click();
});

When("eu tento excluir a música com título {string}", (name:string) => {
    cy.get(`button[data-info=${name}]`).click();
});

Then("vejo o lançamento {string} com gênero {string} e subgênero {string}", (texto:string, genero:string, subgenero:string) => {
    cy.get('h3').contains("Nome: "+ texto).should('exist')
    cy.get('div').contains("Gênero: "+ genero).should('exist')
    cy.get('div').contains("Subgênero: "+ subgenero).should('exist')
    cy.get('h3').contains("Nome: "+ texto).click()
});

Then("vejo a música {string}", (musica:string) =>
    cy.get(`input[value=${musica}]`).should('exist')
);

Then("não há música {string} em {string}", (song:string, album:string) => {
    cy.get('h3').contains("Nome: "+ album).click()
    cy.get(`input[value=${song}]`).should('not.exist')
});


