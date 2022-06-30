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
        comics: {
          comic: {
            creators: {
              creator: true,
            },
          }
        },
        events: {
          event: {
          }
        },
        series: {
          serie: {
          }
        },
        stories: {
          story: true,
        }
      },
      select: {
        name: true,
        description: true,
        id: true,
        comics: {
          comic: {
            title: true,
            id: true,
            description: true,
            creators: {
              creator: {
                name: true,
                id: true,
              }
            },
          },
        },
        events: {
          event: {
            title: true,
            id: true,
            description: true,
            start: true,
            end: true,
          }
        },
        series: {
          serie: {
            title: true,
            id: true,
            description: true,
          },
        },
        stories: {
          story: {
            title: true,
            id: true,
            description: true,
          }
        }
      },
    });
    
    return {
      status: "Banco estressado com sucesso",
      data: allData
    };
  }

}

export {JMeterService};