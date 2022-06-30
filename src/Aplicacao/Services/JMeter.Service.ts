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
        urls: {
          url: true,
        },
        comics: {
          comic: {
            creators: {
              creator: true,
            },
            urls: {
              url: true,
            }
          }
        },
        events: {
          event: {
            urls: {
              url: true,
            }
          }
        },
        series: {
          serie: {
            urls: {
              url: true,
            }
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
        urls: {
          url: {
            type: true,
            url: true,
          },
        },
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
            urls: {
              url: {
                type: true,
                url: true,
              },
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
            urls: {
              url: {
                type: true,
                url: true,
              }
            }
          }
        },
        series: {
          serie: {
            title: true,
            id: true,
            description: true,
            urls: {
              url: {
                type: true,
                url: true,
              },
            },
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