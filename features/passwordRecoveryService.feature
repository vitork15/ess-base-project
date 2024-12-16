Feature: Recuperação de Senha no Sistema
    As a usuário cadastrado
    I want to recuperar a senha da minha conta
    So that eu possa me logar no sistema

#Service Scenario
Scenario: Recuperação de Senha no Sistema com Sucesso
    Given existe um usuário de email "rpol@cin.ufpe.br"
    When uma requisição "POST" é feito no endpoint "/users/42"
    And o body da requisição possui email: "rpol@cin.ufpe.br"
    Then o sistema retorna o código "200"
    And o sistema envia um e-mail de recuperação para o e-mail "rpol@cin.ufpe.br"