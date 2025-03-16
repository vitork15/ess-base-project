Feature: Visualizar e interagir com músicas na seção Em Alta
    As a Usuário autenticado no aplicativo
    I want Visualizar e interagir com as músicas mais populares na seção Em Alta
    So that Eu possa ouvir e descobrir as músicas mais tocadas no momento 

    Scenario: Exibir músicas na seção "Em Alta"
        Given O usuário "João" está autenticado no sistema
        And Existem músicas suficientes no sistema 
        When O usuário acessa a página em Alte
        Then O sistema exibe uma lista com as músicas mais populares
        And Cada música deve conter:O título da música, nome do artista e a capa do álbum (ou imagem associada)
    
    Scenario: Exibir mensagem quando não há músicas em alta
        Given O usuário "Clara" acessa a seção "Em Alta"
        And Não existem músicas suficientes no sitema
        When O sistema carrega a página "Em Alta"
        Then O sistema exibe a mensagem "Nenhuma música em alta no momento"
        And Não exibe nenhum item