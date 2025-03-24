Feature: Cadastro e Manutenção de Músicas e Álbuns
    As a Artista
    I want to inserir, remover e atualizar músicas e álbuns
    So that eu posso disponibilizar minhas músicas para os usuários da plataforma

Scenario: Inserindo um single
    Given estou autenticado como artista de login "joy-division5" e senha "123456"
    And eu estou na página de adicionar album
    When eu informo que quero adicionar 1 nova música do gênero "Rock" e subgênero "Post-Punk"
    And cadastro "Something Must Break" como título do lançamento
    And cadastro "Something Must" como título da música "1"
    And eu confirmo o lançamento das músicas
    Then sou encaminhado para a página "artists/joy-division5"
    And vejo o lançamento "Something Must Break" com gênero "Rock" e subgênero "Post-Punk"

Scenario: Inserindo um EP
    Given estou autenticado como artista de login "joy-division5" e senha "123456"
    And eu estou na página de adicionar album
    When eu informo que quero adicionar 3 novas músicas do gênero "Rock" e subgênero "Grunge"
    And cadastro "Nevermind" como título do lançamento
    And cadastro "Polly" como título da música "1"
    And cadastro "Come" como título da música "2"
    And cadastro "Heart" como título da música "3"
    And eu confirmo o lançamento das músicas
    Then sou encaminhado para a página "artists/joy-division5"
    And vejo o lançamento "Nevermind" com gênero "Rock" e subgênero "Grunge"
    And vejo a música "Polly"
    And vejo a música "Come"
    And vejo a música "Heart"

Scenario: Removendo uma música de um lançamento
    Given estou autenticado como artista de login "joy-division5" e senha "123456"
    And eu estou na página de perfil
    And existe um lançamento "Nevermind"
    When eu informo que quero atualizar o lançamento "Nevermind"
    And eu tento excluir a música com título "Polly"
    Then sou encaminhado para a página "artists/joy-division5"
    And não há música "Polly" em "Nevermind"