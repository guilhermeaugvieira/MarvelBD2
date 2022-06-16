import md5 from "blueimp-md5";
import { Request, Response } from "express";
import axios from "axios";

class CharactersController{
  carga = async (requisicao: Request, resposta: Response): Promise<Response> => {
    let url = 'characters?limit=100'

    if(+requisicao.params.page > 1)
      url += `&offset=${(+requisicao.params.page - 1) * 100}`;

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
  
    return resposta.json(result.data);
  }
}

export { CharactersController };