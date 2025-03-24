Feature: Cadastro e Manutenção de Usuários
    As a usuário do serviço de streaming
    I want to cadastrar, atualizar e deletar minha conta
    So that eu possa me autenticar no sistema

#GUI Scenario
Scenario: Cadastro de Usuário com Sucesso
    Given eu estou na página "register"
    And não existe usuário com o login "fizz"
    And não existe usuário com o e-mail "dggb@cin.ufpe.br"
    And eu preencho o campo "Nome" com "Davi Guerreiro"
    And eu preencho o campo "Aniversário" com "16/12/2024"
    And eu preencho o campo "Login" com "fizz"
    And eu preencho o campo "E-mail" com "dggb@cin.ufpe.br"
    And eu preencho o campo "Senha" com "senha456"
    When eu seleciono "Cadastrar"
    And aparece a mensagem "Cadastro feito com sucesso!"

Scenario: Falha no Cadastro do Usuário por Dados Repetidos
    Given eu estou na página "register"
    And existe usuário com o login "fizz"
    And eu preencho o campo "Nome" com "Davi Guerreiro"
    And eu preencho o campo "Aniversário" com "16/12/2024"
    And eu preencho o campo "Login" com "fizz"
    And eu preencho o campo "E-mail" com "dggb@cin.ufpe.br"
    And eu preencho o campo "Senha" com "senha456"
    When eu seleciono "Cadastrar"
    Then aparece a mensagem "Já existe cadastro com esse login"
    And eu continuo na página "register"

Scenario: Falha no Cadastro de Usuário por Falta de Dados Obrigatórios
    Given eu estou na página "register"
    And eu preencho o campo "Nome" com "Davi Guerreiro"
    And eu preencho o campo "Aniversário" com "16/12/2024"
    And eu preencho o campo "Login" com "fizz"
    And eu preencho o campo "Senha" com "senha456"
    When não preencho o campo "E-mail"
    And eu seleciono "Cadastrar"
    Then o campo "E-mail" é considerado inválido
    And eu continuo na página "register"

Scenario: Falha no Cadastro do Usuário por Senha Insuficiente
    Given eu estou na página "register"
    And eu preencho o campo "Nome" com "Davi Guerreiro"
    And eu preencho o campo "Aniversário" com "16/12/2024"
    And eu preencho o campo "Login" com "fizz"
    And eu preencho o campo "E-mail" com "dggb@cin.ufpe.br"
    When eu preencho o campo "Senha" com "senha"
    And eu seleciono "Cadastrar"
    Then aparece a mensagem "Sua senha deve conter pelo menos 6 caracteres"
    And eu continuo na página "register"

Scenario: Atualização de Cadastro de Usuário com Sucesso
    Given estou autenticado como o usuário de login "javeiro" e senha "12345678"
    And eu seleciono "Perfil"
    And eu seleciono "Editar"
    And não existe usuário com o login "javamelhorquec"
    And eu apago o campo "Login"
    And eu preencho o campo "Login" com "javamelhorquec"
    When eu seleciono "Editar"
    Then aparece a mensagem "Mudança feita com sucesso!"
    And eu continuo na página "edit"

Scenario: Falha na Atualização de Cadastro de Usuário por Campo Vazio
    Given estou autenticado como o usuário de login "javamelhorquec" e senha "12345678"
    And eu seleciono "Perfil"
    And eu seleciono "Editar"
    And eu apago o campo "Login"
    And não preencho o campo "Login"
    When eu seleciono "Editar"
    Then o campo "Login" é considerado inválido
    And eu continuo na página "edit"

Scenario: Falha na Atualização de Cadastro de Usuário por Dados Repetidos
    Given estou autenticado como o usuário de login "javamelhorquec" e senha "12345678"
    And eu seleciono "Perfil"
    And eu seleciono "Editar"
    And eu apago o campo "Login"
    And eu preencho o campo "Login" com "fizz"
    When eu seleciono "Editar"
    Then aparece a mensagem "Já existe um usuário com esse login"
    And eu continuo na página "edit"

Scenario: Atualização de Senha de Usuário com Sucesso
    Given estou autenticado como o usuário de login "javamelhorquec" e senha "12345678"
    And eu seleciono "Perfil"
    And eu seleciono "Editar"
    And eu seleciono "Alterar Senha"
    And eu preencho o campo "Senha" com "12345678910"
    When eu seleciono "Editar"
    Then aparece a mensagem "Senha modificada com sucesso"
    And eu continuo na página "edit/password"

Scenario: Falha na Atualização de Senha de Usuário por Senha Insuficiente
    Given estou autenticado como o usuário de login "javamelhorquec" e senha "12345678910"
    And eu seleciono "Perfil"
    And eu seleciono "Editar"
    And eu seleciono "Alterar Senha"
    And eu preencho o campo "Senha" com "123"
    When eu seleciono "Editar"
    Then aparece a mensagem "Sua senha deve conter pelo menos 6 caracteres"
    And eu continuo na página "edit/password"

Scenario: Deleção de Conta de Usuário
    Given estou autenticado como o usuário de login "fizz" e senha "senha456"
    And eu seleciono "Perfil"
    And eu seleciono "Editar"
    When eu seleciono "Deletar Conta"
    And eu seleciono "Sim"
    Then sou encaminhado para a página "login"