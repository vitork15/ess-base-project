Feature: Ver e salvamentos donos das playlists
    As a Usuário autenticado no aplicativo
    I want To ver seguidores e donos de playlists
    So that eu posso analisar as informações de uma playlists

Scenario: Visualisar o dono de uma playlist
    Given o usuário "break" esta na página da "playlist" de nome "sucessos de 2010"
    When usuário seleciona a opção "Criador"
    Then usuário permanece na página da "playlist" "sucessos de 2010"
    And aparece o "nome de usuário" dono da "playlist" selecionada

Scenario: Visualizar o dono de uma playlist
    Given o usuário "Vitor" esta na página da "playlist" de nome "Piseiro bolado"
    And usuário dono da "playlist" selecionada foi deletado
    When usuário seleciona a opção "Criador"
    Then usuário permanece na página da "playlist" "Piseiro bolado"
    And a mensagem "usuário não existe" é enviada

Scenario: Visualizar a quantidade de pessoas que salvaram uma playlist
    Given o usuário "Alex" esta na página da "playlist" de nome "Best of Taylor Swift songs"
    And os usuários "Vitinho" e "Lucas" salvaram a playlist
    When Alex seleciona a opção "Salvamentos"
    Then usuário permanece na página da "playlist" de no "Best of Taylor Swift songs"
    And aparece a "quantidade de seguidores = 2"