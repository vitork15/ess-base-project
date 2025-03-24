Feature: cadastro e manutenção de artista
    As a artista do sistema
    I want to me cadastrar e modificar meus dados no sistema
    So that eu possa fazer login e utilizar a plataforma de streaming

Scenario: Cadastro de artista com sucesso
    Given não existe artista com o nome artístico "Luan Santana"
    And não existe artista com o login "LS_2010"
    And não existe artista com o e-mail "luan@gmail.com" 
    And eu preencho o campo nome artístico com "Luan Santana"
    And eu preencho o campo login com "LS_2010"
    And eu preencho o campo e-mail com "luan@gmail.com"
    And eu preencho o campo senha com "pass1aerag"
    And eu preencho o campo bio com "cantor do bem"
    When uma requisição POST é mandada para "/artists" 
    Then a resposta da requisição tem o código "201"
    And o sistema retorna a mensagem "Artista cadastrado com sucesso."
    
Scenario: Falha na atualização do cadastro de artista
    Given existe Artista com o nome artístico preenchido com "Daniel Oliveira"
    And existe um artista com Login "dandan"
    And o campo nome artístico está preenchido com "Daniel Oliveira"
    When eu envio uma requisição PATCH para "/artists/dandan"
    Then a resposta da requisição tem o código "400"
    And o sistema retorna a mensagem "Nome já em uso."

Scenario: Falha no cadastro de artista por campo obrigatório vazio
    Given eu preencho o campo nome artístico com "Daniel Silva"
    And eu preencho o campo login com ""
    And eu preencho o campo e-mail com "daniel32@gmail.com"
    And eu preencho o campo senha com "password1"
    And eu preencho o campo bio com "cantor do bem"
    When uma requisição POST é mandada para "/artists" 
    Then a resposta da requisição tem o código "400"
    And o sistema retorna a mensagem "Preencha todos os campos."

Scenario: Atualização do cadastro de artista com sucesso
    Given não existe Artista com o nome artístico preenchido com "Luis Piastri"
    And existe um artista com Login "P_luis"
    And o campo nome artístico está preenchido com "Luis Piastri"
    When eu envio uma requisição PATCH para "/artists/P_luis"
    Then a resposta da requisição tem o código "200"
    And o sistema retorna a mensagem "Artista atualizado com sucesso."