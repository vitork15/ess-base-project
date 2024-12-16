Feature: Categorias em Playlist(s)
    As a usuário autenticado
    I want to adicionar, editar ou excluir categoria(s) à uma playlist
    So that eu possa identificar uma playlist para fins de busca e identificação

Background:
    Given O usuário autenticado "Rodrigo Pontes"
    And com login: "rpol", senha: "1234" e ID: "4"

Scenario: Adicionar categoria à uma playlist na edição de uma playlist
    Given que o usuário tem uma playlist de ID "42" cadastrada no sistema
    When eu mando uma requisição "POST" no endpoint "/playlist/42/categories" para adicionar a categoria de ID "3" à playlist
    And eu mando uma requisição "POST" no endpoint "/playlist/42/categories" para adicionar a categoria de ID "4" à playlist
    Then o sistema deve retornar um código "201"
    And o sistema deveria ter a categoria de ID "3" cadastrada na playlist de ID "42"
    And o sistema deveria ter a categoria de ID "4" cadastrada na playlist de ID "42"

Scenario: Cadastro de música em uma playlist sem categorias
    Given que o usuário tem uma playlist de ID "24" foi cadastrada no sistema
    And a playlist de ID "24" não tem músicas
    And a playlist de ID "24" não tem categorias cadastradas no sistema
    When eu faço uma requisição "POST"  ao sistema no endpoint "/playlist/24/songs" para cadastrar a música de ID "45" com o campo "genero" preenchido com "Brega" na playlist
    Then o sistema deve mandar um código "201"
    And o sistema deveria ter a categoria com nome "Brega" e ID "4" como nova categoria cadastrada da playlist