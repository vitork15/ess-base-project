Feature: Página Inicial
    As a usuário
    I  quero ver as principais recomendações e funcionalidades do aplicativo na página inicial
    So that eu possa ter uma melhor experiência musical

    Scenario: Acessar músicas em alta
        Given O usuário "Maria" está autenticado no aplicativo 
        And está na página inicial
        When O usuário seleciona a opção "Em alta"
        Then O sistema é redirecionado para a página de músicas "emAlta"

    Scenario: Acessar a página inicial deslogado
        Given que o usuário está na página inicial
        And o usuário não está autenticado
        Then o usuário deve ver uma mensagem o redirecionando para a página de login