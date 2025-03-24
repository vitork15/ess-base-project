import {Given, When, Then, BeforeStep} from '@badeball/cypress-cucumber-preprocessor'

const userData = {
  login: 'user09',
  name: 'Thiago Silva',
  email: 'user09@example.com',
  password: 'userpass123',
  birthday: '1990-05-01',
};

const userDataJson = JSON.stringify(userData, null, 2);


Given("o usuário {string} de senha {string} está em {string}", (usuario,string, string2) => {
  cy.request({
    method: 'POST',
    url: 'http://localhost:5001/users', 
    body: userDataJson,
    headers: {
      'Content-Type': 'application/json', 
    },
    failOnStatusCode: false, 
  }).then((response) => {
    cy.log('Resposta do servidor:', JSON.stringify(response.body)); 
  
    
    if (response.status === 201) {
      cy.log('Usuário criado com sucesso');
    } 
    
    else if (response.status === 403) {
      cy.log('Usuário já existe');
    } 
    
    else {
      throw new Error(`Erro inesperado: ${response.status} - ${JSON.stringify(response.body)}`);
    }
  });
    
      
      cy.visit('/login');
      cy.get('input[name="login"]').type(userData.login);
      cy.get('input[name="password"]').type(userData.password);
      cy.get('button[type="submit"]').click();
      cy.get('#profile').click()

      cy.url().should('include', '/users/') ;
    });

    Given("o usuário já possui músicas no histórico", function () {
      
      const musicData = {
        musicId: 123, 
        artist: "Carlos",
        title: "Música X",
      };

      cy.request({
        method: 'POST',
        url: `http://localhost:5001/musichistory/${userData.login}`, 
        body: musicData,
        headers: {
          'Content-Type': 'application/json',
        },
        failOnStatusCode: false, 
      }).then((response) => {
        cy.log('Resposta ao adicionar música ao histórico:', JSON.stringify(response.body)); 

        if (response.status === 201) {
          cy.log('Música adicionada ao histórico com sucesso');
        } else if (response.status === 400) {
          cy.log('Erro 400 ao adicionar música ao histórico:', JSON.stringify(response.body));
        } else {
          cy.log('Erro inesperado ao adicionar música ao histórico:', response.status);
        }
      });
    });
  

    When("o usuário seleciona a opção {string}", function (opcao) {
      cy.contains('button', `${opcao}`).click();
    })

    Then("o usuário está na página {string}", (url) => {
      cy.url().should('include', `${url}`)
    })

    Then("o histórico é exibido", () => {
      cy.get("#historicocontainer")  
      .should('be.visible')  

      
  
    })

    Given ("o usuário {string} e senha {string} está na página {string}", (usuario : string, senha : string, url : string) => {
      cy.request({
        method: 'POST',
        url: 'http://localhost:5001/users', 
        body: userDataJson,
        headers: {
          'Content-Type': 'application/json', 
        },
        failOnStatusCode: false, 
      }).then((response) => {
        cy.log('Resposta do servidor:', JSON.stringify(response.body)); 
      
        
        if (response.status === 201) {
          cy.log('Usuário criado com sucesso');
        } 
        
        else if (response.status === 403) {
          cy.log('Usuário já existe');
        } 
        
        else {
          throw new Error(`Erro inesperado: ${response.status} - ${JSON.stringify(response.body)}`);
        }
      });
        
          // Realiza o login com o usuário gerado
          cy.visit('/login');
          cy.get('input[name="login"]').type(usuario);
          cy.get('input[name="password"]').type(senha);
          cy.get('button[type="submit"]').click();
          cy.contains('div', 'Perfil').click();
          cy.contains('button', `${url}`).click()  
    
          cy.url().should('include', '/historico') ;
    })

    Given("há música no histórico", function () {
      const musicData = {
        musicId: 123, 
        artist: "Carlos",
        title: "Música X",
      };

      cy.request({
        method: 'POST',
        url: `http://localhost:5001/musichistory/${userData.login}`, 
        body: musicData,
        headers: {
          'Content-Type': 'application/json',
        },
        failOnStatusCode: false, 
      }).then((response) => {
        cy.log('Resposta ao adicionar música ao histórico:', JSON.stringify(response.body)); 

        if (response.status === 201) {
          cy.log('Música adicionada ao histórico com sucesso');
        } else if (response.status === 400) {
          cy.log('Erro 400 ao adicionar música ao histórico:', JSON.stringify(response.body));
        } else {
          cy.log('Erro inesperado ao adicionar música ao histórico:', response.status);
        }
      });
    });
    
    When ("o usuário escolhe a opção {string}", (opcao : string) => {
      cy.contains('button', `${opcao}`, {timeout: 10000}).click();
    })
    
    Then ("o usuário permanece em {string}", (opcao : string) => {
      cy.url().should('include', `${opcao}`)
    })

    Then("o histórico está vazio", () => {
      cy.get("#historicocontainer")  
      .should('be.visible')  

      cy.get("#historicocontainer div")
      .should('have.length', 0)
    })