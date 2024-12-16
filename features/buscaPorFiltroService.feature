Feature: Busca com Filtro
    As a usuário autenticado
    I want to buscar por somente músicas, playlists, artistas, gêneros ou subgêneros
    So that eu possa especificar qual o conjunto no qual estou fazendo a busca

Background:
    Given O usuário autenticado "Rodrigo Pontes"
    And com login: "rpol", senha: "1234" e ID: "4"

Scenario: Pesquisar com um Filtro
    Given eu estou na página de "/search/?filter=playlist"
    And a opção de filtros estiver preenchida com "playlist"
    When eu realizo uma requisição "POST" ao sistema com endpoint "/search/?filter=playlist"
    And eu preencho o campo "busca" com "Rock"
    Then o sistema deve me retornar o código "201"
    And eu o sistema deveria me retornar todas as playlists com a palavra "Rock" no nome seguidas de todas as playlists com a categoria "Rock"

