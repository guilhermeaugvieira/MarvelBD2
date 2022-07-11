# Projeto
O projeto é uma abstração da base de dados da [Marvel](https://developer.marvel.com/), feita com a intenção de aplicar os conceitos:
- Transação (Banco de Dados)
- Propriedades ACID (Banco de Dados)
- Índices (Banco de Dados)
- Permissões (Banco de Dados)
- Relatórios Ad-HOC (Banco de Dados)
- Teste de Carga (JMeter)
- Utilização dos dados (Aplicação Backend)

## Configuração do projeto
- Inicie pelo arquivo Data-Source, presente em src/Dados/Data-Source.ts, configure o acesso a seu banco de dados por ali
- Em src/API/Environment há um arquivo chamado .env.example, renomeio o mesmo para somente .env, preenchendo a chave pública e privada que obteve da api da marvel
- Baixe os pacotes necessários utilizando o comando `npm i`

## Criação da base de dados
- Crie uma base de dados chamada `marvel`, e execute a migração pelo comando
```sh
npm run typeorm migration:run
```
- Após esse procedimento seu banco de dados já estará pronto para ser utilizado

## Processo de Carga
- Copie dentro de src/Dados a pasta `Cache` dos [arquivos obtidos](https://drive.google.com/file/d/102JP3-chHR5CMggoDGG5kqw-7wERa8T7/view?usp=sharing)
- Execute os seguintes comandos para a execução dos servidores de cache, (mantenha-os executando durante a etapa de carga)
```sh
npm run cache-character
npm run cache-comic
npm run cache-event
npm run cache-serie
npm run cache-story1
npm run cache-story2
npm run cache-story3
npm run cache-story4
npm run cache-story5
npm run cache-story6
```
- Com todas as etapas concluidas basta executar o [endpoint de carga](http://localhost:3000/api/carga)
- Quando finalizar uma mensagem será emitida, com o `status` da carga feita no banco

## Utilização da Aplicação
Para a utilização da aplicação backend, foi disponibilizada uma documentação online e testável [Swagger](http://localhost:3000/api/swagger), onde estão presente todos os endpoints.
- O comando para execução do projeto é
```sh
npm run start
```
- Após a execução, todos os recursos necessários estarão disponíveis para o uso, a aplicação ficará disponível após a mensagem `Api rodando na porta 3000`

## Recursos Utilizados para o desenvolvimento da aplicação backend
- [Express](https://www.npmjs.com/package/express)
- [Celebrate](https://www.npmjs.com/package/celebrate)
- [Typescript](https://www.npmjs.com/package/typescript)
- [Json-Server](https://www.npmjs.com/package/json-server)
- [TypeORM](https://www.npmjs.com/package/typeorm)
- [Axios](https://www.npmjs.com/package/axios)
- [Swagger](https://www.npmjs.com/package/swagger-ui-express)
- [Node JS](https://nodejs.org/en/)
- [PostgreSql](https://www.postgresql.org/)

## Front-End da Aplicação
- [Front-End](https://github.com/rldrodrigo/bd2-marvel-api) desenvolvido para utilizar os recursos do backend 
