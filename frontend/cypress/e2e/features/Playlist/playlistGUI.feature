Feature: Playlist
    As a usuário
    I want to criar, atualizar e remover playlists
    So that eu poderei organizar minhas músicas favoritas

    

Scenario: Criar uma nova playlist
Given O usuário "Maria" foi cadastrado no sistema
And O usuário está na página de "Biblioteca"
When O usuário seleciona para adicionar uma nova playlist
Then uma nova playlist é adicionada na biblioteca do usuário
And O usuário continua na página de "Biblioteca"

Scenario: Remover uma playlist
Given O usuário "Maria" foi cadastrado no sistema
And O usuário está na página de "Biblioteca"
And O usuário tem a playlist "só as pisadinhas"
When O usuário seleciona para remover a playlist "só as pisadinhas"
Then O usuário não vê nenhuma playlist
And O usuário continua na página de "Biblioteca"

Scenario: Atualizar nome de playlist
Given O usuário "Maria" foi cadastrado no sistema
And O usuário está na página de "Biblioteca"
And O usuário tem a playlist "Só as pisadinhas"
When O usuário seleciona para editar a playlist "Só as pisadinhas"
And O usuário escolhe o nome "KPOP de cria"
Then O usuário ve a playlist "KPOP de cria"
And O usuário continua na página de "Biblioteca"

