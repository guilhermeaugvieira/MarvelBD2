import { Router } from 'express';
import { rotasCharacters } from './routes/Characters.routes';

const rotas = Router();

rotas.use('/characters', rotasCharacters);

export { rotas };
