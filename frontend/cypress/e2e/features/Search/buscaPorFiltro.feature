Feature: Search
    As a usuário
    I want to buscar por somente músicas, playlists, artistas
    So that eu possa especificar qual o conjunto no qual estou fazendo a busca




Scenario: Pesquisar sem um Filtro
    Given O usuário "javeiro" foi cadastrado no sistema 
    And O usuário está na página de "Busca"
    And O campo de filtro aparece vazio
    When eu preencho o campo "Pesquisar..." com "r"
    And eu seleciono "🔍"
    Then eu continuo na página "search"
    And eu deveria ver os resultados "rod", "Rock ou morte" e "Rockzera"

Scenario: Pesquisar com um Filtro
    Given O usuário "javeiro" foi cadastrado no sistema 
    And O usuário está na página de "Busca"
    When eu preencho campo de filtro aparece com valor "playlist"
    And eu preencho o campo "Pesquisar..." com "r"
    And eu seleciono "🔍"
    Then eu continuo na página "search"
    And eu deveria ver os resultados "Rockzera"




