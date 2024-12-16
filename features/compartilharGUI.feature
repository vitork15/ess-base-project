Feature: Compartilhar página personalizada
    As a Usuário autenticado no aplicativo
    I want to compartilhar uma pagina a minha escolha
    So that eu posso compartilhar meus gostos com outras pessoas

Scenario: Compartilhar playlist
    Given estou na página da playlist "gospel metálico"
    When seleciono a opção "compartilhar"
    Then continuo na página da playlist "gospel metálico"
    And recebo um link direcionado para a playlist "gospel metálico"

Scenario: Compartilhar Artista
    Given estou na página do artista "Queen"
    When seleciono a opção "compartilhar"
    Then continuo na página do artista
    And recebo um link direcianado para a página do artista "Queen"

Scenario: Compartilhar Música
    Given estou na página da música "The line"
    When seleciono a opção "compartilhar"
    Then continuo na página da música
    And recebo um link direcionado para a página da música "The line"

    
