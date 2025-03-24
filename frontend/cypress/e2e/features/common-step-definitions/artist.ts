import { Given, Then, When } from "@badeball/cypress-cucumber-preprocessor";

// Given("eu estou na página {string}", (page: string) => {
//     cy.visit(page);
// })

Given("não existe Artista com o campo {string} preenchido com {string}", (campo: string, valor: string) => {
  expect(true)
})

Given("estou autenticado como o artista de login {string} e senha {string}", (login : string, senha : string) => {
  cy.visit('artistlogin');
  cy.get(`input[placeholder="Login"]`).type(login);
  cy.get(`input[placeholder="Senha"]`).type(senha);
  cy.get('button').contains('Entrar').click();
});

Given("Eu preencho o campo {string} com {string}", (campo : string, value : string) => {
  cy.get(`input[placeholder="${campo}"]`).clear().type(value);
});
Given("existe Artista com o campo {string} preenchido com {string}", (campo : string, value : string) => {
  expect(true)
}); 
Then("eu posso ver o nome {string}", (message: string) => {
  cy.contains(message).should('be.visible')
});

// When("eu seleciono {string}", (button: string) => {
//   cy.get('button').contains(button).click();
// })

// Then("aparece a mensagem {string}", (message: string) => {
//   cy.contains(message).should('be.visible')
// });

// Then("sou encaminhado para a página {string}", (page: string) => {
//   cy.location('pathname').should('eq',`/${page}`)
// });