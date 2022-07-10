import { Router } from 'express';
import { rotasCarga } from './Routes/Carga.Routes';
import { rotaSwagger } from './Routes/Swagger';
import { rotasJMeter } from './Routes/JMeter.Routes';
import { rotasDados } from './Routes/Dados.Routes';

const rotas = Router();

rotas.use('/', rotasCarga);
rotas.use('/', rotasJMeter);
rotas.use('/', rotasDados);
rotas.use('/', rotaSwagger);

export { rotas };
