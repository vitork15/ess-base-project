Feature: cadastro e manutenção de artista
    As a artista do sistema
    I want to me cadastrar e modificar meus dados no sistema
    So that eu possa fazer login e utilizar a plataforma de streaming

Scenario: Falha no cadastro de artista por campo obrigatório vazio
    Given eu preencho o campo nome artístico com "Daniel Silva"
    And eu preencho o campo login com ""
    And eu preencho o campo e-mail com "daniel32@gmail.com"
    And eu preencho o campo senha com "password1"
    And eu preencho o campo bio com "cantor do bem"
    When uma requisição POST é mandada para "/artists" 
    Then a resposta da requisição tem o código "400"
    And o sistema retorna a mensagem "Preencha os campos obrigatórios."

Scenario: Atualização no cadastro de artista com sucesso
    Given não existe Artista com o nome artístico preenchido com "Daniel Oliveira"
    And existe um artista com Login "ttt"
    And o campo nome artístico está preenchido com "Daniel Oliveira"
    When eu envio uma requisição PATCH para "/artists/ttt"
    Then a resposta da requisição tem o código "200"