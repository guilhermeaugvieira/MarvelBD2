import { celebrate, errors, Joi, Segments } from "celebrate";
import { Router } from "express";
import { container } from "tsyringe";
import { CharactersController } from "../Controllers/Characters.Controller";

const rotasCharacters = Router();

const charactersController = container.resolve(CharactersController);

rotasCharacters.post("/:page", celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    page: Joi.number().required().min(1).max(16),
  }),
}), charactersController.carga);

rotasCharacters.use(errors());

export { rotasCharacters };