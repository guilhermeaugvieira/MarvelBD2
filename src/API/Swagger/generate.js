
import swaggerAutogen from "swagger-autogen";

const doc = {
  swagger: "2.0",
  info: {
    version: "1.0.0",
    title: "API Sistema de Empréstimos",
    description: "Documentação da API do Sistema de Empréstimos"
  },
  host: "localhost:3000",
  basePath: "/api",
  schemes: ['http'],
  consumes: ['application/json'],
  produces: ['application/json'],
  tags: [
    {
      name: "Characters",
      description: "Gerencia os personagens"
    },
  ],
  securityDefinitions: {
    apiKeyAuth:{
      type: "apiKey",
      in: "header",       // can be "header", "query" or "cookie"
      name: "authorization",  // name of the header, query parameter or cookie
      description: "Insira o token seguido de 'Bearer '"
    }
  },
  definitions: {
    RespostaCarga: {
      Status: 'Carga feita com sucesso'
    }
  }
}

const outputFile = './src/API/Swagger/swaggerDocs.json';
const endpointsFiles = ['./src/API/Routes/*.Routes.ts'];

swaggerAutogen()(outputFile, endpointsFiles, doc);