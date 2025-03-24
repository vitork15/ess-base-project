import { Given, Then, When } from "@badeball/cypress-cucumber-preprocessor";


Given("O campo de filtro aparece vazio", () =>{
    cy.get('[type="radio"]').check("none")
})
When("eu preencho campo de filtro aparece com valor {string}", (filter:string) =>{
    cy.get('[type="radio"]').check(filter)
})
Then("eu deveria ver os resultados {string}, {string} e {string}",(artist:string, song:string,playlist:string)=>{
    cy.get('article').contains(`${artist}`)
    cy.get('article').contains(`${song}`)
    cy.get('article').contains(`${playlist}`)
})
Then("eu deveria ver os resultados {string}",(playlist:string)=>{
    cy.get('article').contains(`${playlist}`)
})