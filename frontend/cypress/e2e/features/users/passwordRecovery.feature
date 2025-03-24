Feature: Recuperação de Senha
    As a usuário cadastrado
    I want to recuperar a senha da minha conta
    So that eu possa me autenticar novamente no sistema

Scenario: Recuperação de Senha com Sucesso
    Given eu estou na página "recovery"
    And eu preencho o campo "E-mail" com "rpol@cin.ufpe.br"
    When eu seleciono "Recuperar senha"
    Then aparece a mensagem "E-mail enviado para rpol@cin.ufpe.br"
    And eu continuo na página "recovery"

Scenario: Falha na Recuperação de Senha por Conta Inexistente
    Given eu estou na página "recovery"
    And não existe usuário com o e-mail "dggb@cin.ufpe.br"
    And eu preencho o campo "E-mail" com "dggb@cin.ufpe.br"
    When eu seleciono "Recuperar senha"
    Then aparece a mensagem "Usuário não encontrado"
    And eu continuo na página "recovery"