import { celebrate, errors, Joi, Segments } from "celebrate";
import { Router } from "express";
import { container } from "tsyringe";
import { CharactersController } from "../Controllers/Characters.Controller";

const rotasCharacters = Router();

const charactersController = container.resolve(CharactersController);

rotasCharacters.post("/characters",
  /*
    #swagger.tags = ['Characters']
    #swagger.summary = 'Aplica a carga no banco de dados'
    #swagger.description = 'Retorna o status de aplicação da carga'
    #swagger.responses[200] = {
      description: 'Ok',
      schema: {
        $ref: '#/definitions/RespostaCarga'
      }
    }
  */
charactersController.carga);

rotasCharacters.use(errors());

export { rotasCharacters };