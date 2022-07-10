import { errors, celebrate, Segments, Joi } from "celebrate";
import { Router } from "express";
import { container } from "tsyringe";
import { DadosController } from "../Controllers/Dados.Controller";

const rotasDados = Router();

const dadosController = container.resolve(DadosController);

rotasDados.get("/dados/personagens", 

  /*  
  #swagger.tags = ['Dados']
  #swagger.summary = 'Obtem os dados dos personagens de forma paginada'
  #swagger.description = 'Retorna os dados dos personagens e todos os dados associados'
  #swagger.responses[200] = {
    description: 'Ok',
    schema: {
      $ref: '#/definitions/RespostaPersonagens'
    }
  }

  #swagger.parameters = ['id_personagem'] = {
    in: 'query',
    description: 'Id do personagem procurado',
    required: false,
    type: 'string'
  },
  
  #swagger.parameters = ['nome_personagem'] = {
    in: 'query',
    description: 'Parte do nome do personagem procurado',
    required: false,
    type: 'string'
  },

  #swagger.parameters = ['nome_quadrinho'] = {
    in: 'query',
    description: 'Parte do nome do quadrinho que o personagem faz parte',
    required: false,
    type: 'string'
  },

  #swagger.parameters = ['nome_evento'] = {
    in: 'query',
    description: 'Parte do nome do evento que o personagem faz parte',
    required: false,
    type: 'string'
  },

  #swagger.parameters = ['nome_serie'] = {
    in: 'query',
    description: 'Parte do nome da serie que o personagem faz parte',
    required: false,
    type: 'string'
  },

  #swagger.parameters = ['nome_historia'] = {
    in: 'query',
    description: 'Parte do nome da história que o personagem faz parte',
    required: false,
    type: 'string'
  },

  #swagger.parameters = ['numero_pagina'] = {
    in: 'query',
    description: 'Número da página procurada',
    required: false,
    type: 'number'
  },

  #swagger.parameters = ['total_resultados'] = {
    in: 'query',
    description: 'Quantidade de resultados esperados',
    required: false,
    type: 'number'
  },
  */

  celebrate(
    {
      [Segments.QUERY]: Joi.object().keys(
        {
          total_resultados: Joi.number().required().min(1).max(1562),
          numero_pagina: Joi.number().min(1),
          id_personagem: Joi.number().min(1),
          nome_personagem: Joi.string().trim().not(''),
          nome_quadrinho: Joi.string().trim().not(''),
          nome_evento: Joi.string().trim().not(''),
          nome_serie: Joi.string().trim().not(''),
          nome_historia: Joi.string().trim().not(''),
        }
      ),
    }
  ),

  dadosController.obterDadosPersonagens
);

rotasDados.get("/dados/eventos", 

  /*  
  #swagger.tags = ['Dados']
  #swagger.summary = 'Obtem os dados dos eventos de forma paginada'
  #swagger.description = 'Retorna os dados dos eventos e todos os dados associados'
  #swagger.responses[200] = {
    description: 'Ok',
    schema: {
      $ref: '#/definitions/RespostaEventos'
    }
  }
  
  #swagger.parameters = ['id_evento'] = {
    in: 'query',
    description: 'Id do evento procurado',
    required: false,
    type: 'string'
  },
  
  #swagger.parameters = ['nome_evento'] = {
    in: 'query',
    description: 'Parte do nome do evento procurado',
    required: false,
    type: 'string'
  },

  #swagger.parameters = ['nome_personagem'] = {
    in: 'query',
    description: 'Parte do nome do personagem que faz parte do evento',
    required: false,
    type: 'string'
  },

  #swagger.parameters = ['numero_pagina'] = {
    in: 'query',
    description: 'Número da página procurada',
    required: false,
    type: 'number'
  },

  #swagger.parameters = ['total_resultados'] = {
    in: 'query',
    description: 'Quantidade de resultados esperados',
    required: false,
    type: 'number'
  },
  */

  celebrate(
    {
      [Segments.QUERY]: Joi.object().keys(
        {
          total_resultados: Joi.number().required().min(1).max(70),
          numero_pagina: Joi.number().min(1),
          id_evento: Joi.number().min(1),
          nome_evento: Joi.string().trim().not(''),
          nome_personagem: Joi.string().trim().not('')
        }
      ),
    }
  ),

  dadosController.obterDadosEventos
);

rotasDados.get("/dados/quadrinhos", 

  /*  
  #swagger.tags = ['Dados']
  #swagger.summary = 'Obtem os dados dos quadrinhos de forma paginada'
  #swagger.description = 'Retorna os dados dos quadrinhos e todos os dados associados'
  #swagger.responses[200] = {
    description: 'Ok',
    schema: {
      $ref: '#/definitions/RespostaQuadrinhos'
    }
  }
  
  #swagger.parameters = ['id_quadrinho'] = {
    in: 'query',
    description: 'Id do quadrinho procurado',
    required: false,
    type: 'string'
  },
  
  #swagger.parameters = ['nome_quadrinho'] = {
    in: 'query',
    description: 'Parte do nome do quadrinho procurado',
    required: false,
    type: 'string'
  },

  #swagger.parameters = ['nome_personagem'] = {
    in: 'query',
    description: 'Parte do nome do personagem que faz parte do quadrinho',
    required: false,
    type: 'string'
  },

  #swagger.parameters = ['nome_criador'] = {
    in: 'query',
    description: 'Parte do nome do criador do quadrinho',
    required: false,
    type: 'string'
  },

  #swagger.parameters = ['numero_pagina'] = {
    in: 'query',
    description: 'Número da página procurada',
    required: false,
    type: 'number'
  },

  #swagger.parameters = ['total_resultados'] = {
    in: 'query',
    description: 'Quantidade de resultados esperados',
    required: false,
    type: 'number'
  },
  */

  celebrate(
    {
      [Segments.QUERY]: Joi.object().keys(
        {
          total_resultados: Joi.number().required().min(1).max(10861),
          numero_pagina: Joi.number().min(1),
          id_quadrinho: Joi.number().min(1),
          nome_quadrinho: Joi.string().trim().not(''),
          nome_personagem: Joi.string().trim().not(''),
          nome_criador: Joi.string().trim().not(''),
        }
      ),
    }
  ),

  dadosController.obterDadosQuadrinhos
);

rotasDados.get("/dados/series", 

  /*  
  #swagger.tags = ['Dados']
  #swagger.summary = 'Obtem os dados das series de forma paginada'
  #swagger.description = 'Retorna os dados das series e todos os dados associados'
  #swagger.responses[200] = {
    description: 'Ok',
    schema: {
      $ref: '#/definitions/RespostaSeries'
    }
  }

    #swagger.parameters = ['id_serie'] = {
    in: 'query',
    description: 'Id da série procurada',
    required: false,
    type: 'string'
  },
  
  #swagger.parameters = ['nome_serie'] = {
    in: 'query',
    description: 'Parte do nome da série procurado',
    required: false,
    type: 'string'
  },

  #swagger.parameters = ['nome_personagem'] = {
    in: 'query',
    description: 'Parte do nome do personagem que faz parte da série',
    required: false,
    type: 'string'
  },

  #swagger.parameters = ['numero_pagina'] = {
    in: 'query',
    description: 'Número da página procurada',
    required: false,
    type: 'number'
  },

  #swagger.parameters = ['total_resultados'] = {
    in: 'query',
    description: 'Quantidade de resultados esperados',
    required: false,
    type: 'number'
  },
  */

  celebrate(
    {
      [Segments.QUERY]: Joi.object().keys(
        {
          total_resultados: Joi.number().required().min(1).max(3040),
          numero_pagina: Joi.number().min(1),
          id_serie: Joi.number().min(1),
          nome_serie: Joi.string().trim().not(''),
          nome_personagem: Joi.string().trim().not('')
        }
      ),
    }
  ),

  dadosController.obterDadosSeries
);

rotasDados.get("/dados/historias", 

  /*  
  #swagger.tags = ['Dados']
  #swagger.summary = 'Obtem os dados das storias de forma paginada'
  #swagger.description = 'Retorna os dados das storias e todos os dados associados'
  #swagger.responses[200] = {
    description: 'Ok',
    schema: {
      $ref: '#/definitions/RespostaStorias'
    }
  }

    #swagger.parameters = ['id_historia'] = {
    in: 'query',
    description: 'Id da história procurado',
    required: false,
    type: 'string'
  },
  
  #swagger.parameters = ['nome_historia'] = {
    in: 'query',
    description: 'Parte do nome da história procurado',
    required: false,
    type: 'string'
  },

  #swagger.parameters = ['nome_personagem'] = {
    in: 'query',
    description: 'Parte do nome do personagem que faz parte da história',
    required: false,
    type: 'string'
  },

  #swagger.parameters = ['nome_quadrinho'] = {
    in: 'query',
    description: 'Parte do nome do quadrinho que originou a história',
    required: false,
    type: 'string'
  },

  #swagger.parameters = ['numero_pagina'] = {
    in: 'query',
    description: 'Número da página procurada',
    required: false,
    type: 'number'
  },

  #swagger.parameters = ['total_resultados'] = {
    in: 'query',
    description: 'Quantidade de resultados esperados',
    required: false,
    type: 'number'
  },
  */

  celebrate(
    {
      [Segments.QUERY]: Joi.object().keys(
        {
          total_resultados: Joi.number().required().min(1).max(10109),
          numero_pagina: Joi.number().min(1),
          id_historia: Joi.number().min(1),
          nome_historia: Joi.string().trim().not(''),
          nome_personagem: Joi.string().trim().not(''),
          nome_quadrinho: Joi.string().trim().not(''),
        }
      ),
    }
  ),

  dadosController.obterDadosStories
);

rotasDados.use(errors());

export { rotasDados };