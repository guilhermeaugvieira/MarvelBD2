import { Router } from 'express';
import { rotasCharacters } from './Characters.routes';

const rotas = Router();

rotas.use('/characters/', rotasCharacters);

export { rotas };
