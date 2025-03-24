Feature: Visualizar e interagir com músicas na seção Em Alta
    As a Usuário autenticado no aplicativo
    I want Visualizar e interagir com as músicas mais populares na seção Em Alta
    So that Eu possa ouvir e descobrir as músicas mais tocadas no momento 

    Scenario: Exibir músicas na seção "Em Alta"
        Given O usuário "Maria" está autenticado no sistema
        And Existem músicas suficientes no sistema 
        When O usuário acessa a página "emAlta"
        Then O sistema exibe uma lista com as músicas mais populares
        And Cada música deve conter:O título da música, nome do artista e a capa do álbum
    
     Scenario: Reproduzir uma música
        Given O usuário "Maria" está na página "emAlta"
        And Uma música é exibida em qualquer uma das seções
        When O usuário seleciona uma música específica
        Then O sistema inicia a reprodução da música selecionada
        And A música aparece no player localizado na parte inferior esquerda da tela