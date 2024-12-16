Feature: Cadastro, Atualização e Remoção de Usuários no Sistema
    As a usuário do serviço de streaming
    I want to cadastrar, atualizar e remover contas
    So that eu possa utilizar o sistema com minhas informações

#Service Scenario
Scenario: Deleção de Usuário no Sistema
    Given existe um usuário de ID "9"
    When uma requisição "DELETE" é feita no endpoint "/users/9"
    Then o usuário de ID "9" é removido no banco de dados
    And o sistema retorna o código "200"

#Service Scenario
Scenario: Cadastro de Usuário no Sistema com Sucesso
    Given não existe usuário com o login "fizz"
    And não existe usuário com o e-mail "dggb@cin.ufpe.br"
    When uma requisição "POST" é feita no endpoint "/users"
    And o body da requisição possui name: "Davi Guerreiro"
    And o body da requisição possui birthday: "16/12/2024"
    And o body da requisição possui login: "fizz"
    And o body da requisição possui email: "dggb@cin.ufpe.br"
    And o body da requisição possui senha: "senha456"
    Then o sistema retorna o código "201"
    And o usuário é cadastrado no banco de dados com as informações do body

#Service Scenario
Scenario: Falha de Cadastro de Usuário no Sistema por Dados Repetidos
    Given existe usuário com o login "fizz"
    When uma requisição "POST" é feita no endpoint "/users"
    And o body da requisição possui name: "Davi Guerreiro"
    And o body da requisição possui birthday: "16/12/2024"
    And o body da requisição possui login: "fizz"
    And o body da requisição possui email: "dggb@cin.ufpe.br"
    And o body da requisição possui senha: "senha456"
    Then o sistema retorna o código "400"
    And o sistema retorna a mensagem de erro "Já existe cadastro com esse login"

#Service Scenario
Scenario: Atualização de Senha de Usuário no Sistema com Sucesso
    Given o usuário de ID "19" deseja mudar sua senha para "senhasenha"
    When uma requisição "PATCH" é feita no endpoint "/users/19"
    Then o sistema retorna o código "200"
    And a senha do usuário de ID "19" é modificada no banco de dados para "senhasenha"