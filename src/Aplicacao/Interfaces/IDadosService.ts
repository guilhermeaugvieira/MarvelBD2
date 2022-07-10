import { EventoInput, HistoriaInput, PersonagemInput, QuadrinhoInput, SerieInput } from "../Responses/IAPIInput"
import { IEventData, ISerieData, IStoryData } from "../Responses/IAPIResponse"
import { IBaseResponse, ICharacterData, IComicData } from "../Responses/IAPIResponse"

interface IDadosService {
  obterPersonagens(filtro: PersonagemInput): Promise<IBaseResponse<ICharacterData>>
  obterQuadrinhos(filtro: QuadrinhoInput): Promise<IBaseResponse<IComicData>>
  obterEventos(filtro: EventoInput): Promise<IBaseResponse<IEventData>>
  obterSeries(filtro: SerieInput): Promise<IBaseResponse<ISerieData>>
  obterStories(filtro: HistoriaInput): Promise<IBaseResponse<IStoryData>>
}

export { IDadosService }