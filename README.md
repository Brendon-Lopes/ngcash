# Desafio NGCash

## Descrição
Esse projeto se trata de uma aplicação FullStack, que tem como objetivo simular um sistema de banco digital moderno e fácil de usar.
Nele é possível fazer login, cadastrar novos usuários e fazer transferências pra outros usuários cadastrados na plataforma.
Também é possível ver todas as transações em que o usuário logado participou, assim como filtrá-las por data e/ou tipo (cash-in, cash-out ou todos).

## Principais tecnologias utilizadas
- NodeJS
- TypeScript
- Express
- JWT
- Prisma
- PostgreSQL
- Zod
- ReactJS
- TailwindCSS
- Docker

## Requisitos para rodar o projeto
- docker
- docker-compose

## Rodando o projeto
Na raíz do projeto, execute o comando `docker-compose up -d` para subir os containers da aplicação.

Quando os containers estiverem rodando, execute o comando `docker exec -it ngcash-server sh` para entrar no container do servidor, e rode o comando `npm run db:setup` para criar as tabelas e semear o banco de dados.

Rode o comando `exit` se desejar sair do container.

O projeto estará rodando no endereço [http://localhost:3000](http://localhost:3000)

A API roda separadamente, no endereço [http://localhost:3001](http://localhost:3001) caso queira testar alguma requisição.

### Credenciais para Login
É possível criar uma conta, mas já existem algumas contas criadas para facilitar os testes.
- username: `geralt`
- senha: `Aa123456`

Usuários pré-cadastrados para testar a funcionalidade de transferência: `ciri`, `yennefer`.

## Rodando os testes
Por enquanto só estão disponíveis testes unitários no backend, para rodar siga os passos a seguir:
- Entre no container do servidor com o comando `docker exec -it ngcash-server sh`
- Rode o comando `npm run test`

## Considerações sobre o Backend
Com certeza onde gastei mais tempo nesse projeto foi no Backend, pois tentei deixar o mais bem feito possível, com testes, e tentando na medida que o tempo permitiu seguir os princípios do SOLID e Clean Code. Estou usando uma arquitetura baseada em camadas, e as camadas de Service e Controller são testadas isoladamente, utilizando Mocha, Chai e Sinon.

## Considerações finais
É sempre um desafio concluir um projeto full stack em 7 dias, mas foi uma experiência muito boa e aprendi muito. Sempre ficam detalhes que eu gostaria de ter feito, coisas que gostaria de ter mudado, simplificado, o CSS que acabou não dando tempo de fazer muito. Mas acredito que o importante é que o projeto está funcional, e esse foi meu foco.
