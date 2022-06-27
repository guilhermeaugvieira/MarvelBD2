import { Router } from 'express';
import { rotasCarga } from './Routes/Carga.routes';
import { rotaSwagger } from './Routes/Swagger';

const rotas = Router();

rotas.use('/', rotasCarga);
rotas.use('/', rotaSwagger);

export { rotas };
