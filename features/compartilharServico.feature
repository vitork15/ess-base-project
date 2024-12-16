Feature: Compartilhar página personalizada
    As a Usuário autenticado no aplicativo
    I want to compartilhar uma pagina a minha escolha
    So that eu posso compartilhar meus gostos com outras pessoas

Scenario: Compartilhar playlist da biblioteca
    Given usuário de ID "16", login "Julio" e senha "1234"  esta autenticado no sistema
    And Usuário quer compartilhar uma playlist com ID "27" e nome "Eletro pop"
    When o usuário realiza uma requisição "POST" no endpoint "/playlist/27/share"
    Then sistema retorna código "201"
    And sistema retorna link gerado

Scenario: Compartilhamento de música inexistente
    Given Usuário de ID "20", login "Rodrigo" e senha "2345" esta autenticado no sistema
    And Usuário quer compartilhar uma Música com ID "27" e nome "A raposa e as uvas"
    When usuário realiza requisição "POST" no endpoint "/Songs/27/share'
    Then Sistema retorna código "201"
    And sistema retorna link gerado

Scenario: Compartilhamento de música inexistente
    Given Usuário de ID "20", login "Alex" e senha "3456" esta autenticado no sistema
    And Usuário quer compartilhar uma Música com ID "27" e nome "A raposa e as uvas"
    And a Música de ID "27" foi deletada
    when usuário realiza requisição "POST" no endpoint "/Songs/27/share'
    Then Sistema retorna código "204"
    And sistema retorna mensagem "Música inexistente"
