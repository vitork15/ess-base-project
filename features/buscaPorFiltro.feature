Feature: Busca com Filtro
    As a usuário autenticado
    I want to buscar por somente músicas, playlists, artistas, gêneros ou subgêneros
    So that eu possa especificar qual o conjunto no qual estou fazendo a busca

Background:
    Given O usuário autenticado "Rodrigo Pontes"
    And com login: "rpol", senha: "1234" e ID: "4"

Scenario: Selecionar um Filtro
    Given eu estou na página de "Busca"
    When eu seleciono a opção de "filtros"
    And eu seleciono a opção de adcionar filtro "playlist" nas opções de filtro 
    Then eu deveria estar na página de "Busca"
    And o filtro "playlist" deveria aparecer no campo de filtro

Scenario: Retirar um Filtro
    Given eu estou na página de "Busca"
    And o filtro "playlist" aparece no campo de filtro
    When eu seleciono a opção de "filtros"
    And eu seleciono a opção de retirar o filtro "playlist" nas opções de filtro 
    Then eu deveria estar na página de "Busca"
    And o filtro "playlist" não deveria aparecer no campo de filtro

Scenario: Selecionar mais de um Filtro
    Given eu estou na página de "Busca"
    When eu seleciono a opção de "filtros"
    And eu seleciono o filtro "playlist" nas opções de filtro
    And eu seleciono o filtro "artistas" nas opções de filtro
    Then uma notificação de erro deveria aparecer
    And eu deveria estar na página de "Busca"
    And nenhum filtro deveria aparecer" no campo de filtro

Scenario: Pesquisar sem um Filtro
    Given eu estou na página de "Busca"
    And o campo de filtro aparece vazio
    When eu preencho o campo de busca com "Vida Noturna"
    And eu seleciono a opção "Buscar"
    Then eu deveria estar na página de "Busca"
    And eu deveria ver todos os gêneros com a palavra "Vida Noturna" no nome seguidos dos subgêneros, 
    artistas, músicas, playlist, e por fim playlists com a categoria "Vida Noturna"

Scenario: Pesquisar com um Filtro
    Given eu estou na página de "Busca"
    And o filtro "playlist" aparece no campo de filtro
    When eu preencho o campo de busca com "Rock"
    And eu seleciono a opção "Buscar"
    Then eu deveria estar na página de "Busca"
    And eu deveria ver todas as playlists com a palavra "Rock" no nome seguidas de todas as playlists com a categoria "Rock"




