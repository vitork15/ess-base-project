Feature: Visualizar e interagir com músicas na seção Em Alta
    As a Usuário autenticado no aplicativo
    I want Visualizar e interagir com as músicas mais populares na seção Em Alta
    So that Eu possa ouvir e descobrir as músicas mais tocadas no momento 

    Scenario: Contagem de visualizações
        Given a música de id "02" esteja registrada no sistema e retorne "5" como número de visualizações
        When o usuário faz a requisição especifica da música de id "02"
        Then a música passa a conter "6" visualizações

    Scenario: Poucas músicas no sistema
        Given o usuário acessou na página em alta
        And não haja músicas suficientes no sistema
        When o sistema faz a requisição das músicas mais populares
        Then o servidor retorna uma mensagem com status negativo

    Scenario: Carregar músicas em alta
        Given o usuário acessou na página em alta
        And há músicas suficientes no sistema
        When o sistema faz a requisição das músicas mais populares
        Then o servidor retorna uma mensagem confirmando a pesquisa e uma lista com as músicas