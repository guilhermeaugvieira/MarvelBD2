import express, {Request, Response} from 'express';
import { rotas } from './Config.Routes';
import cors from 'cors';
import { SwaggerOptions } from 'swagger-ui-express'

const servidor = express();
const swaggerFile = require('./Swagger/swaggerDocs.json');

servidor.use(express.json());
servidor.use(express.urlencoded({extended: true}));
servidor.use(cors());
servidor.use('/api/', rotas);

servidor.get("/", (requisicao: Request, resposta: Response) => {
  resposta.send("Servidor Funcionando");
});

export { servidor };