import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";
import { IDadosService } from "../../Aplicacao/Interfaces/IDadosService";
import { EventoInput, HistoriaInput, PersonagemInput, QuadrinhoInput, SerieInput } from "../../Aplicacao/Responses/IAPIInput";

@injectable()
class DadosController{
  constructor(@inject('DadosService') private _dadosService: IDadosService){}

  obterDadosPersonagens = async (requisicao: Request, resposta: Response): Promise<Response> => {
    const filtro: PersonagemInput = {
      idPersonagem : requisicao.query.id_personagem ? parseInt(requisicao.query.id_personagem.toString()) : null,
      numeroPagina: requisicao.query.numero_pagina ? parseInt(requisicao.query.numero_pagina.toString()) : 1,
      totalResultados: +requisicao.query.total_resultados,
      nomeEvento: requisicao.query.nome_evento?.toString() || null,
      nomeHistoria: requisicao.query.nome_historia?.toString() || null,
      nomePersonagem: requisicao.query.nome_personagem?.toString() || null,
      nomeQuadrinho: requisicao.query.nome_quadrinho?.toString() || null,
      nomeSerie: requisicao.query.nome_serie?.toString() || null,
    }
    
    return resposta.json(await this._dadosService.obterPersonagens(filtro));
  }

  obterDadosQuadrinhos = async (requisicao: Request, resposta: Response): Promise<Response> => {
    const filtro: QuadrinhoInput = {
      idQuadrinho : requisicao.query.id_quadrinho ? parseInt(requisicao.query.id_quadrinho.toString()) : null,
      numeroPagina: requisicao.query.numero_pagina ? parseInt(requisicao.query.numero_pagina.toString()) : 1,
      totalResultados: +requisicao.query.total_resultados,
      nomePersonagem: requisicao.query.nome_personagem?.toString() || null,
      nomeQuadrinho: requisicao.query.nome_quadrinho?.toString() || null,
      nomeCriador: requisicao.query.nome_criador?.toString() || null,
    }
    
    return resposta.json(await this._dadosService.obterQuadrinhos(filtro));
  }

  obterDadosEventos = async (requisicao: Request, resposta: Response): Promise<Response> => {
    const filtro: EventoInput = {
      idEvento : requisicao.query.id_evento? parseInt(requisicao.query.id_evento.toString()) : null,
      numeroPagina: requisicao.query.numero_pagina ? parseInt(requisicao.query.numero_pagina.toString()) : 1,
      totalResultados: +requisicao.query.total_resultados,
      nomeEvento: requisicao.query.nome_evento?.toString() || null,
      nomePersonagem: requisicao.query.nome_personagem?.toString() || null,
    }
    
    return resposta.json(await this._dadosService.obterEventos(filtro));
  }

  obterDadosSeries = async (requisicao: Request, resposta: Response): Promise<Response> => {
    const filtro: SerieInput = {
      idSerie : requisicao.query.id_serie? parseInt(requisicao.query.id_serie.toString()) : null,
      numeroPagina: requisicao.query.numero_pagina ? parseInt(requisicao.query.numero_pagina.toString()) : 1,
      totalResultados: +requisicao.query.total_resultados,
      nomePersonagem: requisicao.query.nome_personagem?.toString() || null,
      nomeSerie: requisicao.query.nome_serie?.toString() || null,
    }
    
    return resposta.json(await this._dadosService.obterSeries(filtro));
  }

  obterDadosStories = async (requisicao: Request, resposta: Response): Promise<Response> => {
    const filtro: HistoriaInput = {
      idHistoria : requisicao.query.id_historia ? parseInt(requisicao.query.id_historia.toString()) : null,
      numeroPagina: requisicao.query.numero_pagina ? parseInt(requisicao.query.numero_pagina.toString()) : 1,
      totalResultados: +requisicao.query.total_resultados,
      nomePersonagem: requisicao.query.nome_personagem?.toString() || null,
      nomeHistoria: requisicao.query.nome_historia?.toString() || null,
      nomeQuadrinho: requisicao.query.nomeQuadrinho?.toString() || null,
    }
    
    return resposta.json(await this._dadosService.obterStories(filtro));
  }
}

export { DadosController };