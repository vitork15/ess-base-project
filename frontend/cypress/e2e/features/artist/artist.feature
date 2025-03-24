Feature: cadastro e manutenção de artista
    As a artista do sistema
    I want to me cadastrar e modificar meus dados no sistema
    So that eu possa fazer login e utilizar a plataforma de streaming

Scenario: Cadastro de artista com sucesso
    Given eu estou na página "artistregistration"
    And não existe Artista com o campo "Nome" preenchido com "Daniel Silva"
    And não existe Artista com o campo "Login" preenchido com "dan32"
    And não existe Artista com o campo "E-mail" preenchido com "daniel32@gmail.com"
    When eu preencho o campo "Nome" com "Daniel Silva"
    And eu preencho o campo "Login" com "Dan32"
    And eu preencho o campo "E-mail" com "daniel32@gmail.com"
    And eu preencho o campo "Senha" com "password1"
    And eu seleciono "Cadastrar"
    Then aparece a mensagem "Artista cadastrado com sucesso."
    And sou encaminhado para a página "artistlogin"

Scenario: Falha no caadastro de artista por login repetido
    Given eu estou na página "artistregistration"
    And não existe Artista com o campo "Nome" preenchido com "Denilson"
    And existe Artista com o campo "Login" preenchido com "dan32"
    And não existe Artista com o campo "E-mail" preenchido com "denilson@gmail.com"
    When eu preencho o campo "Nome" com "Daniel Silva"
    And eu preencho o campo "Login" com "Dan32"
    And eu preencho o campo "E-mail" com "denilson@gmail.com"
    And eu preencho o campo "Senha" com "password1"
    And eu seleciono "Cadastrar"
    Then aparece a mensagem "Login já em uso."
    And eu continuo na página "artistregistration"

Scenario: Atualização no cadastro de artista com sucesso
    Given estou autenticado como o artista de login "dan32" e senha "password1"
    And eu seleciono "Perfil"
    And eu seleciono "Editar"
    And não existe Artista com o campo "Nome" preenchido com "Daniel Oliveira"
    When Eu preencho o campo "Novo nome" com "Daniel Oliveira"
    And eu seleciono "Confirmar"
    Then sou encaminhado para a página "artists/dan32"
    And eu posso ver o nome "Daniel Oliveira"