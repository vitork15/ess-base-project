Feature: Cadastro e Manutenção de Músicas e Álbuns
    As a Artista
    I want to inserir, remover e atualizar músicas e álbuns
    So that eu posso disponibilizar minhas músicas para os usuários da plataforma

Scenario: Inserindo single no sistema
    Given o usuario de id "4002" está autenticado como "artist"
    When uma requisição "POST" é feita no endpoint "/albums"
    And o campo "qtd_musicas" está preenchido com "1"
    And o campo "genero" está preenchido com "Rock"
    And o campo "subgenero" está preenchido com "Post-Punk"
    And o campo "nome_lancamento" está preenchido com "Something Must Break"
    And o campo "nome_musicas" está preenchido com "'Something Must Break'"
    And o campo "artist_id" está preenchido com "4002"
    Then o sistema retorna o código "201"
    And o lançamento é registrado no banco de dados
    And o campo "tipo" está preenchido com "Single"

Scenario: Inserindo single com feat no sistema
    Given o usuario de id "8922" está autenticado como "artist"
    When uma requisição "POST" é feita no endpoint "/albums"
    And o campo "qtd_musicas" está preenchido com "1"
    And o campo "genero" está preenchido com "MPB"
    And o campo "subgenero" está preenchido com "Bossa-Nova"
    And o campo "nome_lancamento" está preenchido com "Águas de Março"
    And o campo "nome_musicas" está preenchido com "'Águas de Março'"
    And o campo "artist_id" está preenchido com "8922"
    And o campo "feat" está preenchido com "Tom Jobim"
    Then o sistema retorna o código "201"
    And o lançamento é registrado no banco de dados
    And o campo "tipo" está preenchido com "Single"
    And o campo "nome_musicas" está preenchido com "'Águas de Março (feat. Tom Jobim)'"

Scenario: inserindo um EP no sistema
    Given o usuario de id "666" está autenticado como "artist"
    When uma requisição "POST" é feita no endpoint "/albums"
    And o campo "qtd_musicas" está preenchido com "3"
    And o campo "genero" está preenchido com "Rock"
    And o campo "subgenero" está preenchido com "Grunge"
    And o campo "nome_lancamento" está preenchido com "Nevermind"
    And o campo "nome_musicas" está preenchido com "'Polly', 'Come As You Are', 'Heart-Shaped-Box'"
    And o campo "artist_id" está preenchido com "666"
    Then o sistema retorna o código "201"
    And o lançamento é registrado no banco de dados
    And o campo "tipo" está preenchido com "EP"

Scenario: removendo um lançamento do sistema
    Given o usuario de id "4002" está autenticado como "artist"
    And existe um lancamento com id "1001" para esse usuario
    When uma requisição "DELETE" é feita no endpoint "/albums/1001"
    Then o sistema retorna o código "200"
    And o lançamento é removido do banco de dados

Scenario: atualizando um lançamento 
    Given o usuario de id "1000" está autenticado como "artist"
    And existe um lançamento com id "1" para esse usuario
    And o lançamento possui o campo "subgenero" com "Rap Coreano"
    When uma requisição "PATCH" é feita no endpoint "/albums/1"
    And o campo "subgenero" esta preenchido com "Rap Japonês"
    Then o sistema retorna o código "200"
    And o lançamento é atualizado do banco de dados
    And o campo "subgenero" está preenchido com "Rap Japonês"

Scenario: removendo uma música de um lançamento
    Given o usuario de id "1000" está autenticado como "artist"
    And existe um lançamento com id "1234" para esse usuario
    And o lançamento possui o campo "nome_musicas" com "'Opening', 'Song1', 'Song2', 'Ending'"
    And existe uma musica com id "13" para esse usuario
    When uma requisição "DELETE" é feita no endpoint "/songs/13"
    And o campo "musicas_removidas" da requisição está preenchido com "'Opening'"
    Then uma requisição "PATCH" é feita no endpoint "/albums/1234"
    And o sistema retorna o código "200"
    And a musica é removida do banco de dados
    And o lançamento é atualizado do banco de dados
    And o campo "nome_musicas" do lancamento está preenchido com "'Song1', 'Song2', 'Ending'"

Scenario: falha ao atualizar música com campo nome vazio
    Given o usuario de id "1010" está autenticado como "artist"
    And existe um lançamento com id "13" para esse usuario
    And o lançamento possui o campo "nome_musicas" com "'Enter Sandman', 'Master of Puppets'"
    When uma requisição "PATCH" é feita no endpoint "/albums/13"
    And o campo "nome_musicas" está preenchido com "'Enter Sandman',''"
    Then o sistema retorna o código "400"
    And nenhuma modificação é realizada no banco de dados