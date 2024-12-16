Feature: Recuperação de Senha no Sistema
    As a usuário cadastrado
    I want to recuperar a senha da minha conta
    So that eu possa me logar no sistema

#Service Scenario
Scenario: Recuperação de Senha no Sistema com Sucesso
    Given existe um usuário de e-mail "rpol@cin.ufpe.br" e ID "42"
    When uma requisição "POST" é feito no endpoint "/users/recovery"
    And o body da requisição possui e-mail: "rpol@cin.ufpe.br"
    Then o sistema retorna o código "200"
    And o sistema envia um e-mail para o e-mail "rpol@cin.ufpe.br"
    And o e-mail enviado contém a senha do usuário de ID "42"