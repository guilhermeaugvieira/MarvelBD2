import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";
import { ICharactersService } from "../../Aplicacao/Interfaces/ICharactersService";

@injectable()
class CharactersController{
  constructor(@inject('CharactersService') private _charactersService?: ICharactersService){}
  
  carga = async (requisicao: Request, resposta: Response): Promise<Response> => {  
    return resposta.json(await this._charactersService.aplicarCarga(+requisicao.params.page));
  }
}

export { CharactersController };