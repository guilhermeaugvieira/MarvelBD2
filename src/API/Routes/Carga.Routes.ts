import { celebrate, errors, Joi, Segments } from "celebrate";
import { Router } from "express";
import { container } from "tsyringe";
import { CargaController } from "../Controllers/Carga.Controller";

const rotasCarga = Router();

const cargaController = container.resolve(CargaController);

rotasCarga.post("/carga/:charactersPage",
  /*
    #swagger.tags = ['Carga']
    #swagger.summary = 'Aplica a carga no banco de dados de todas as entidades associadas'
    #swagger.description = 'Retorna o status de aplicação da carga geral'
    #swagger.responses[200] = {
      description: 'Ok',
      schema: {
        $ref: '#/definitions/RespostaCarga'
      }
    }
  */

  celebrate(
    {
      [Segments.PARAMS]: Joi.object().keys(
        {
          charactersPage: Joi.number().required().min(1).max(16),
        }
      ),
    }
  ),cargaController.carga);

rotasCarga.use(errors());

export { rotasCarga };