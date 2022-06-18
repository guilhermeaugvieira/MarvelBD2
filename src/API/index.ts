import "reflect-metadata";
import '../Infraestrutura/Shared/Container/Dependencias';
import { servidor } from './Servidor';
import dotenv from 'dotenv';
import { AppDataSource } from '../Dados/Data-Source';

dotenv.config({
  path: 'src/API/Environment/.env',
});

AppDataSource.initialize();

servidor.listen(process.env.SERVER_PORT, () => {
  console.log(`Api rodando na porta ${process.env.SERVER_PORT}`);
})