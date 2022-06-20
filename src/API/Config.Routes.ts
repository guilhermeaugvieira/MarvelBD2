import { Router } from 'express';
import { rotasCharacters } from './Routes/Characters.routes';
import { rotaSwagger } from './Routes/Swagger';

const rotas = Router();

rotas.use('/', rotasCharacters);
rotas.use('/', rotaSwagger);

export { rotas };
