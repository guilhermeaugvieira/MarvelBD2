import axios from 'axios';
import md5 from "blueimp-md5";
import { Lifecycle, scoped } from 'tsyringe';
import { ICharactersService } from '../Interfaces/ICharactersService';

@scoped(Lifecycle.ContainerScoped)
class CharactersService implements ICharactersService{
  aplicarCarga = async (page: number) => {
    let url = `characters?limit=100&offset=${(page - 1) * 100}`

    const timeStamp = new Date().getTime();
    const hash = md5(`${timeStamp}${process.env.CHAVE_PRIVADA}${process.env.CHAVE_PUBLICA}`);
    
    const result = await axios.get(`${url}`, {
      baseURL: process.env.API_ENDERECO,
      params: {
        ts: timeStamp,
        hash: hash,
        apikey: process.env.CHAVE_PUBLICA
      }
    });

    return result.data;
  }
}

export { CharactersService };