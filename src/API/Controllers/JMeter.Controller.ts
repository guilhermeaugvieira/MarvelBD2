import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";
import { IJMeterService } from "../../Aplicacao/Interfaces/IJMeterService";

@injectable()
class JMeterController{
  constructor(@inject('JMeterService') private _jMeterService?: IJMeterService){}
  
  teste = async (requisicao: Request, resposta: Response): Promise<Response> => {  
    return resposta.json(await this._jMeterService.aplicarTeste(+requisicao.params.limit));
  }
}

export { JMeterController };