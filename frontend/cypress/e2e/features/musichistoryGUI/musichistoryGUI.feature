Feature: Histórico de músicas
As a usuário cadastrado no aplicativo
I want to ver o histórico de músicas e artistas escutados
So that eu posso analisar quanto e como eu gasto o meu tempo escutando música

Scenario: exibir histórico de músicas
Given o usuário "user09" de senha "userpass123" está em "Perfil"
And o usuário já possui músicas no histórico
When o usuário seleciona a opção "Histórico de Músicas"
Then o usuário está na página "/historico"
And o histórico é exibido

Scenario: apagar o histórico de músicas
Given o usuário "user09" e senha "userpass123" está na página "Histórico de Músicas"
And há música no histórico
When o usuário escolhe a opção "Deletar"
Then o usuário permanece em "/historico/user09"
And o histórico está vazio