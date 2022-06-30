import { celebrate, errors, Joi, Segments } from "celebrate";
import { Router } from "express";
import { container } from "tsyringe";
import { JMeterController } from "../Controllers/JMeter.Controller";

const rotasJMeter = Router();

const jMeterController = container.resolve(JMeterController);

rotasJMeter.get("/jmeter/:limit",
  /*
    #swagger.tags = ['JMeter']
    #swagger.summary = 'Aplica o teste do JMeter'
    #swagger.description = 'Estressa com request carregado de entidades'
    #swagger.responses[200] = {
      description: 'Ok',
      schema: {
        $ref: '#/definitions/RespostaJMeter'
      }
    }
  */

  celebrate(
    {
      [Segments.PARAMS]: Joi.object().keys(
        {
          limit: Joi.number().required().min(1).max(1562),
        }
      ),
    }
  ),

  jMeterController.teste);

rotasJMeter.use(errors());

export { rotasJMeter };