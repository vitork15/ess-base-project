Feature: Cadastro e Manutenção de Usuários
    As a usuário do serviço de streaming
    I want to cadastrar, atualizar e deletar minha conta
    So that eu possa me autenticar no sistema

#GUI Scenario
Scenario: Cadastro de Usuário com Sucesso
    Given eu estou na página "Cadastro"
    And não existe usuário com o login "fizz"
    And não existe usuário com o e-mail "dggb@cin.ufpe.br"
    And eu preencho os campo de nome com "Davi Guerreiro"
    And eu preencho os campo de data de nascimento com "16/12/2024"
    And eu preencho os campo de login com "fizz"
    And eu preencho os campo de e-mail com "dggb@cin.ufpe.br"
    And eu preencho os campo de senha com "senha456"
    When eu seleciono "Cadastrar"
    Then sou encaminhado para a página "Login"
    And aparece a mensagem "Cadastro realizado com sucesso"

#GUI Scenario
Scenario: Falha no Cadastro de Usuário por Falta de Dados Obrigatórios
    Given eu estou na página "Cadastro"
    When eu preencho os campo de nome com "Davi Guerreiro"
    And eu preencho os campo de data de nascimento com "16/12/2024"
    And eu preencho os campo de login com "fizz"
    And eu preencho os campo de e-mail com ""
    And eu preencho os campo de senha com "senha456"
    Then a opção "Cadastrar" fica indisponível
    And aparece o aviso "Preencha todos os campos obrigatórios"
    And eu continuo na página "Cadastro"

#GUI Scenario
Scenario: Falha no Cadastro do Usuário por Dados Repetidos
    Given eu estou na página "Cadastro"
    And existe usuário com o login "fizz"
    And eu preencho os campo de nome com "Davi Guerreiro"
    And eu preencho os campo de data de nascimento com "16/12/2024"
    And eu preencho os campo de login com "fizz"
    And eu preencho os campo de e-mail com "dggb@cin.ufpe.br"
    And eu preencho os campo de senha com "senha456"
    When eu seleciono "Cadastrar"
    Then aparece a mensagem "Já existe cadastro com esse login"
    And eu continuo na página "Cadastro"

#GUI Scenario
Scenario: Falha no Cadastro do Usuário por Senha Insuficiente
    Given eu estou na página "Cadastro"
    And eu preencho os campo de nome com "Davi Guerreiro"
    And eu preencho os campo de data de nascimento com "16/12/2024"
    And eu preencho os campo de login com "fizz"
    And eu preencho os campo de e-mail com "dggb@cin.ufpe.br"
    And eu preencho os campo de senha com "senha"
    When eu seleciono "Cadastrar"
    Then a opção "Cadastrar" fica indisponível
    And aparece o aviso "Sua senha deve conter pelo menos 6 caracteres"
    And eu continuo na página "Cadastro"

#GUI Scenario
Scenario: Atualização de Cadastro de Usuário com Sucesso
    Given eu estou na página "Atualização de Cadastro"
    And estou autenticado como o usuário de login "javeiro" e senha "12345678"
    And não existe usuário com o login "javamelhorquec"
    And eu preencho campo de login com "javamelhorquec"
    When eu seleciono "Confirmar"
    Then aparece a mensagem "Informações alteradas com sucesso"
    And permaneço na página "Atualização de Cadastro"

#GUI Scenario
Scenario: Falha na Atualização de Cadastro de Usuário por Campo Vazio
    Given estou autenticado como o usuário de login "javeiro" e senha "12345678"
    And eu estou na página "Atualização de Cadastro"
    And eu preencho campo de login com ""
    When eu seleciono "Confirmar"
    Then aparece a mensagem "Seu login está vazio"
    And permaneço na página "Atualização de Cadastro"

#GUI Scenario
Scenario: Falha na Atualização de Cadastro de Usuário por Dados Repetidos
    Given estou autenticado como o usuário de login "javeiro" e senha "12345678"
    And eu estou na página "Atualização de Cadastro"
    And existe usuário com o login "javamelhorquec"
    And eu preencho campo de login com "javamelhorquec"
    When eu seleciono "Confirmar"
    Then aparece a mensagem "Já existe um usuário com esse login"
    And permaneço na página "Atualização de Cadastro"

#GUI Scenario
Scenario: Atualização de Senha de Usuário com Sucesso
    Given estou autenticado como o usuário de login "javeiro" e senha "12345678"
    And eu estou na página "Alterar Senha"
    And eu preencho o campo senha atual com "12345678"
    And eu preencho o campo nova senha com "senha123"
    And eu preencho segundo campo de nova senha com "senha123"
    When eu seleciono "Alterar"
    Then sou encaminhado para a página "Atualização de Cadastro"
    And aparece a mensagem "Senha alterada com sucesso"

#GUI Scenario
Scenario: Falha na Atualização de Senha de Usuário por Senha Insuficiente
    Given estou autenticado como o usuário de login "javeiro" e senha "12345678"
    And eu estou na página "Alterar Senha"
    And eu preencho o campo senha atual com "12345678"
    And eu preencho o campo nova senha com "123"
    And eu preencho segundo campo de nova senha com "123"
    When eu seleciono "Alterar"
    Then aparece a mensagem "Sua senha deve conter pelo menos 6 caracteres"
    And permaneço na página "Alterar Senha"

#GUI Scenario
Scenario: Falha na Atualização de Senha de Usuário por Senha Atual Incorreta
    Given estou autenticado como o usuário de login "javeiro" e senha "12345678"
    And eu estou na página "Alterar Senha"
    And eu preencho o campo senha atual com "123456"
    And eu preencho o campo nova senha com "senha123"
    And eu preencho segundo campo de nova senha com "senha123"
    When eu seleciono "Alterar"
    Then aparece a mensagem "Senha atual incorreta"
    And permaneço na página "Alterar Senha"

#GUI Scenario
Scenario: Deleção de Conta de Usuário
    Given eu estou na página "Atualização de Cadastro"
    When eu seleciono a opção "Deletar"
    And eu confirmo a opção de "Deletar"
    Then eu sou encaminhado para a página "Login"
    And aparece a mensagem "Conta deletada com sucesso"