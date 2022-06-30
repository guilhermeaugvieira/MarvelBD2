import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";
import { ICargaService } from "../../Aplicacao/Interfaces/ICargaService";

@injectable()
class CargaController{
  constructor(@inject('CargaService') private _cargaService?: ICargaService){}
  
  carga = async (requisicao: Request, resposta: Response): Promise<Response> => {  
    return resposta.json(await this._cargaService.aplicarCarga());
  }
}

export { CargaController };