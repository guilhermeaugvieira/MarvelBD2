
const doc = {
  swagger: "2.0",
  info: {
    version: "1.0.0",
    title: "API Marvel",
    description: "Documentação da API da Marvel - BD2"
  },
  host: "localhost:3000",
  basePath: "/api",
  schemes: ['http'],
  consumes: ['application/json'],
  produces: ['application/json'],
  tags: [
    {
      name: "Carga",
      description: "Carga online do banco de dados"
    },
    {
      name: "JMeter",
      description: "Somente para testes do JMeter"
    },
    {
      name: "Dados",
      description: "Obtenção dos dados registrados na base de dados"
    }
  ],
  definitions: {
    RespostaCarga: {
      Status: 'Carga feita com sucesso'
    },
    RespostaJMeter: {
      Status: 'Banco estressado com sucesso',
      Data: 'Objeto com todos os dados'
    },
    RespostaPersonagens: {
      page: 1,
      totalPages: 4,
      totalResults: 800,
      limit: 20,
      data: [
        {
          id: 1,
          name: 'string',
          description: 'string',
          modified: `${new Date().toISOString()}`,
          resourceUri: 'string',
          thumbnail: 'string',
          comics: [
            {
              id: 1,
              resourceUri: 'string',
              digitalId: 1,
              title: 'string',
              issueNumber: 1,
              variantDescription: 'string',
              description: 'string',
              modified: `${new Date().toISOString()}`,
              isbn: 'string',
              upc: 'string',
              diamondCode: 'string',
              ean: 'string',
              issn: 'string',
              format: 'string',
              pageCount: 1,
              thumbnail: 'string',
              creators: [
                {
                  id: 1,
                  name: 'string',
                  resourceUri: 'string',
                  role: 'string',
                }
              ],
            }
          ],
          events: [
            {
              id: 1,
              resourceUri: 'string',
              title: 'string',
              description: 'string',
              modified: `${new Date().toISOString()}`,
              start: `${new Date().toISOString()}`,
              end: `${new Date().toISOString()}`,
            }
          ],
          series: [
            {
              id: 1,
              resourceUri: 'string',
              title: 'string',
              description: 'string',
              startYear: 1999,
              endYear: 1999,
              modified: `${new Date().toISOString()}`,
            }
          ],
          stories: [
            {
              id: 1,
              type: 'string',
              resourceUri: 'string',
              title: 'string',
              description: 'string',
              modified: `${new Date().toISOString()}`,
            }
          ]
        }
      ],
    },
    RespostaQuadrinhos: {
      page: 1,
      totalPages: 4,
      totalResults: 800,
      limit: 20,
      data: [
        {
          id: 1,
          resourceUri: 'string',
          digitalId: 1,
          title: 'string',
          issueNumber: 1,
          variantDescription: 'string',
          description: 'string',
          modified: `${new Date().toISOString()}`,
          isbn: 'string',
          upc: 'string',
          diamondCode: 'string',
          ean: 'string',
          issn: 'string',
          format: 'string',
          pageCount: 1,
          thumbnail: 'string',
          characters: [
            {
              id: 1,
              name: 'string',
              description: 'string',
              modified: `${new Date().toISOString()}`,
              resourceUri: 'string',
              thumbnail: 'string',
            }
          ],
          creators: [
            {
              id: 1,
              name: 'string',
              resourceUri: 'string',
              role: 'string',
            }
          ],
          stories: [
            {
              id: 1,
              type: 'string',
              resourceUri: 'string',
              title: 'string',
              description: 'string',
              modified: `${new Date().toISOString()}`,
            }
          ],
        }
      ]
    },
    RespostaEventos: {
      page: 1,
      totalPages: 4,
      totalResults: 800,
      limit: 20,
      data: [
        {
          id: 1,
          resourceUri: 'string',
          title: 'string',
          description: 'string',
          modified: `${new Date().toISOString()}`,
          start: `${new Date().toISOString()}`,
          end: `${new Date().toISOString()}`,
          characters: [
            {
              id: 1,
              name: 'string',
              description: 'string',
              modified: `${new Date().toISOString()}`,
              resourceUri: 'string',
              thumbnail: 'string',
            }
          ],
          nextEvent: {
            id: 1,
            resourceUri: 'string',
            title: 'string',
            description: 'string',
            modified: `${new Date().toISOString()}`,
            start: `${new Date().toISOString()}`,
            end: `${new Date().toISOString()}`,
          },
          previousEvent: {
            id: 1,
            resourceUri: 'string',
            title: 'string',
            description: 'string',
            modified: `${new Date().toISOString()}`,
            start: `${new Date().toISOString()}`,
            end: `${new Date().toISOString()}`,
          }
        }
      ]
    },
    RespostaSeries: {
      page: 1,
      totalPages: 4,
      totalResults: 800,
      limit: 20,
      data: [
        {
          id: 1,
          resourceUri: 'string',
          title: 'string',
          description: 'string',
          startYear: 1999,
          endYear: 1999,
          modified: `${new Date().toISOString()}`,
          characters: [
            {
              id: 1,
              name: 'string',
              description: 'string',
              modified: `${new Date().toISOString()}`,
              resourceUri: 'string',
              thumbnail: 'string',
            }
          ],
          nextSerie: {
            id: 1,
            resourceUri: 'string',
            title: 'string',
            description: 'string',
            startYear: 1999,
            endYear: 1999,
            modified: `${new Date().toISOString()}`,
          },
          previousSerie: {
            id: 1,
            resourceUri: 'string',
            title: 'string',
            description: 'string',
            startYear: 1999,
            endYear: 1999,
            modified: `${new Date().toISOString()}`,
          }
        }
      ]
    },
    RespostaStories: {
      page: 1,
      totalPages: 4,
      totalResults: 800,
      limit: 20,
      data: [
        {
          id: 1,
          type: 'string',
          resourceUri: 'string',
          title: 'string',
          description: 'string',
          modified: `${new Date().toISOString()}`,
          characters: [
            {
              id: 1,
              name: 'string',
              description: 'string',
              modified: `${new Date().toISOString()}`,
              resourceUri: 'string',
              thumbnail: 'string',
            }
          ],
          originalIssue: {
            id: 1,
            resourceUri: 'string',
            digitalId: 1,
            title: 'string',
            issueNumber: 1,
            variantDescription: 'string',
            description: 'string',
            modified: `${new Date().toISOString()}`,
            isbn: 'string',
            upc: 'string',
            diamondCode: 'string',
            ean: 'string',
            issn: 'string',
            format: 'string',
            pageCount: 1,
            thumbnail: 'string',
          }
        }
      ]
    },
  }
}

const outputFile = './src/API/Swagger/swaggerDocs.json';
const endpointsFiles = ['./src/API/Routes/*.Routes.ts'];

require("swagger-autogen")()(outputFile, endpointsFiles, doc);