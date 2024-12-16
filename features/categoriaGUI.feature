Feature: Categorias em Playlist(s)
    As a usuário autenticado
    I want to adicionar, editar ou excluir categoria(s) à uma playlist
    So that eu possa identificar uma playlist para fins de busca e identificação

Background:
    Given O usuário autenticado "Rodrigo Pontes"


Scenario: Adicionar categoria à uma playlist na edição de uma playlist
    Given eu estou na página de "Biblioteca"
    And eu tenho uma playlist chamada "Ó sofrência"
    When eu seleciono a opção de editar na playlist "Ó sofrência"
    And eu seleciono para adicionar a categoria "Músicas de verão" na seção de categorias
    And eu seleciono para adicionar a categoria "Brega" na seção de categorias
    Then eu posso ver uma mensagem de confirmação dizendo que as categorias "Músicas de verão" e "Brega" foram adicionadas
    And eu deveria estar na página de "Biblioteca"


Scenario: Excluir categoria de uma playlist na edição de uma playlist
    Given eu estou na página de "Biblioteca"
    And eu tenho uma playlist chamada "Ó sofrência"
    And a playlist tem a categoria "Música de verão"
    When eu seleciono a opção de editar na playlist "Ó sofrência"
    And eu seleciono para remover a categoria "Músicas de verão" da seção de categorias
    Then eu posso ver uma mensagem de confirmação dizendo que as categorias "Músicas de verão" foi retirada
    And eu deveria estar na página de "Biblioteca"
