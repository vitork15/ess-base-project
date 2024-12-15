Scenario: Criação de playlist
Given O usuário de ID "3" não tem nenhuma "playlist" cadastrada no sistema
When Uma requisição "POST" é feita no endpoint "/playlists"
And O body da requisição possui UserID como "3" nome como "Rock" e músicas como "[1,2]"
Then O sistema retorna o código "201"
And A nova playlist é criada no banco de dados

Scenario: Remoção de playlist
Given O usuário tem uma playlist de ID "29" cadastrado no sistema
When Uma requisição "DELETE" é feita no endpoint "/playlists/29"
Then O sistema retorna o cógigo "204"
And A playlist de ID "29" é excluida do sistema 

Scenario: Obter todas as playlists de um usuário
Given O usuário de ID "3" tem "2" "playlists" de ID "20" e "21"
When Uma requisição "GET" é feita no endpoint "/playlists?userID=3"
Then O sistema retorna o código "200"
And Um "JSON" é retornado com as informações das pĺaylists de ID "20" e "21"

Scenario: Adicionar uma nova música em uma playlist
Given o usuário possui uma "playlist" de ID "9"
And Deseja-se adicionar uma música de ID "8" já previamente criada no sistema
When Uma requisição "POST" é feita no endpoint "/playlist/9/songs"
And o body da requisição possui songIDs "8"
Then O sistema deve retornar código "201"
And A nova música é adicionada na playlist

Scenario: Remover uma música de uma playlist
Given O usuário possui uma "playlist" de ID "11" que contém uma música de ID "20"
When Uma requisição "DELETE" é feita no endpoint "/playlists/11/songs/20"
Then O sistema deve retornar código "204"
And A música de ID "20" é removida da playlist

Scenario: Obter todas as músicas de uma playlist
Given O usuário possui uma "playlist" de ID "11" com as "músicas" de ID "12" e "13"
When Uma requisição "GET" é feita no endpoint "/playlists/11/songs"
Then O sistema deve retornar código "200"
And Um "JSON" é retornado


