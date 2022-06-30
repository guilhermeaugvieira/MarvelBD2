import { Router } from 'express';
import { rotasCarga } from './Routes/Carga.Routes.Disabled';
import { rotaSwagger } from './Routes/Swagger';
import { rotasJMeter } from './Routes/JMeter.Routes';

const rotas = Router();

//rotas.use('/', rotasCarga);
rotas.use('/', rotasJMeter);
rotas.use('/', rotaSwagger);

export { rotas };
