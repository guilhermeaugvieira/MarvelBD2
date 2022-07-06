import { scoped, Lifecycle } from "tsyringe";
import { AppDataSource } from "../../Dados/Data-Source";
import { Character } from "../../Negocio/Entidades/Character";
import { IJMeterService } from "../Interfaces/IJMeterService";

@scoped(Lifecycle.ResolutionScoped)
class JMeterService implements IJMeterService{
  aplicarTeste = async (limit: number): Promise<Object> => {
    
    const allData = await AppDataSource.getRepository(Character).find({
      take: limit,
      relationLoadStrategy: "query",
      relations: {
        urls: { url: {}},
        comics: {comic: {creators: {creator: {}}, urls: {url: {}}}},
        events: {event: {urls: {url: {}}}},
        series: {serie: {urls: {url: {}},}},
        stories: {story: {}}
      },
      select: {
        urls: true,
        comics: true,
        events: true,
        series: true,
        stories: true,
      }
    });
    
    return {
      status: "Banco estressado com sucesso",
      data: allData
    };
  }

}

export {JMeterService};