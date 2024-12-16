Feature: Recuperação de Senha
    As a usuário cadastrado
    I want to recuperar a senha da minha conta
    So that eu possa me logar no sistema

#GUI Scenario
Scenario: Recuperação de Senha com Sucesso
    Given eu estou na página "Recuperação de Senha"
    And existe usuário com o e-mail "batman@cin.ufpe.br"
    And eu preenchi o campo de e-mail com "batman@cin.ufpe.br"
    When eu seleciono a opção "Recuperar senha"
    Then aparece a mensagem "E-mail de recuperação enviado"
    And eu sou encaminhado para a página "Login"

#GUI Scenario
Scenario: Falha na Recuperação de Senha por Conta Inexistente
    Given eu estou na página "Recuperação de Senha"
    And não existe usuário com o e-mail "batman@cin.ufpe.br"
    And eu preenchi o campo de e-mail com "batman@cin.ufpe.br"
    When eu seleciono a opção "Recuperar senha"
    Then aparece a mensagem "O email não está cadastrado"
    And eu permaneço na página "Recuperação de Senha"