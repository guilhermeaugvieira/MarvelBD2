import { MoreThanOrEqual, ILike,  } from 'typeorm';
import { Lifecycle, scoped } from "tsyringe";
import { AppDataSource } from "../../Dados/Data-Source";
import { Character } from "../../Negocio/Entidades/Character";
import { Comic } from "../../Negocio/Entidades/Comic";
import { Event } from "../../Negocio/Entidades/Event";
import { Serie } from "../../Negocio/Entidades/Serie";
import { Story } from "../../Negocio/Entidades/Story";
import { IDadosService } from "../Interfaces/IDadosService";
import { EventoInput, HistoriaInput, PersonagemInput, QuadrinhoInput, SerieInput } from "../Responses/IAPIInput";
import { IBaseResponse, ICharacterData, ICharacterModelResponse, 
  IComicData, ICreatorModelResponse, IEventData, IEventModelResponse, 
  IExtendedComicModelResponse, ISerieData, ISerieModelResponse, 
  IStoryData, IStoryModelResponse } 
from "../Responses/IAPIResponse";

@scoped(Lifecycle.ResolutionScoped)
class DadosService implements IDadosService{

  obterPersonagens = async (filtro: PersonagemInput): Promise<IBaseResponse<ICharacterData>> => {
    const allData = await AppDataSource.getRepository(Character).findAndCount({
      take: filtro.totalResultados,
      skip: filtro.numeroPagina > 1 ? ((filtro.numeroPagina - 1) * filtro.totalResultados) : 0,
      relationLoadStrategy: "query",
      relations: {
        // urls: { url: {}},
        comics: {comic: {creators: {creator: {}}}},
        events: {event: {}},
        series: {serie: {}},
        stories: {story: {}}
      },
      select: {
        // urls: true,
        comics: true,
        events: true,
        series: true,
        stories: true,
      },
      where: {
        id: filtro.idPersonagem ?? MoreThanOrEqual(1),
        name: filtro.nomePersonagem ? ILike(`%${filtro.nomePersonagem}%`) : ILike('%'),
        comics: {
          comic: {
            title: filtro.nomeQuadrinho ? ILike(`%${filtro.nomeQuadrinho}%`) : ILike('%'),
          }
        },
        events: {
          event: {
            title: filtro.nomeEvento ? ILike(`%${filtro.nomeEvento}%`) : ILike('%'),
          }
        },
        series: {
          serie: {
            title: filtro.nomeSerie ? ILike(`%${filtro.nomeSerie}%`) : ILike('%'),
          }
        },
        stories: {
          story: {
            title: filtro.nomeHistoria ? ILike(`%${filtro.nomeHistoria}%`) : ILike('%'),
          }
        }
      }
    });
    
    return {
      page: filtro.numeroPagina,
      totalPages: Math.ceil((allData[1]/parseFloat(filtro.totalResultados.toString()))),
      limit: filtro.totalResultados,
      totalResults: allData[1],
      data: this.converterResultadosPersonagens(allData[0])
    };
  };

  obterQuadrinhos = async (filtro: QuadrinhoInput): Promise<IBaseResponse<IComicData>> => {
    const allData = await AppDataSource.getRepository(Comic).findAndCount({
      take: filtro.totalResultados,
      skip: filtro.numeroPagina > 1 ? ((filtro.numeroPagina - 1) * filtro.totalResultados) : 0,
      relationLoadStrategy: "query",
      relations: {
        characters: { character: {}},
        creators: { creator: {}},
        stories: {},
      },
      select: {
        characters: true,
        creators: true,
        stories: true,
      },
      where: {
        id: filtro.idQuadrinho ?? MoreThanOrEqual(1),
        title: filtro.nomeQuadrinho ? ILike(`%${filtro.nomeQuadrinho}%`) : ILike('%'),
        characters: {
          character: {
            name: filtro.nomePersonagem ? ILike(`%${filtro.nomePersonagem}%`) : ILike('%'),
          }
        },
        creators: {
          creator: {
            name: filtro.nomeCriador ? ILike(`%${filtro.nomeCriador}%`) : ILike('%'),
          }
        }
      }
    });

    return{
      page: filtro.numeroPagina,
      limit: filtro.totalResultados,
      totalPages: Math.ceil((allData[1]/parseFloat(filtro.totalResultados.toString()))),
      totalResults: allData[1],
      data: this.converterResultadosQuadrinhos(allData[0])
    }
  }

  obterEventos = async (filtro: EventoInput): Promise<IBaseResponse<IEventData>> => {
    const allData = await AppDataSource.getRepository(Event).findAndCount({
      take: filtro.totalResultados,
      skip: filtro.numeroPagina > 1 ? ((filtro.numeroPagina - 1) * filtro.totalResultados) : 0,
      relationLoadStrategy: "query",
      relations: {
        characters: { character: {}},
        nextEventMain: {},
        previousEventMain: {}
      },
      select: {
        characters: true,
        nextEventMain: true,
        previousEventMain: true,
      },
      where: {
        id: filtro.idEvento ?? MoreThanOrEqual(1),
        title: filtro.nomeEvento ? ILike(`%${filtro.nomeEvento}%`) : ILike('%'),
        characters: {
          character: {
            name: filtro.nomePersonagem ? ILike(`%${filtro.nomePersonagem}%`) : ILike('%'),
          }
        }
      }
    });

    return {
      page: filtro.numeroPagina,
      limit: filtro.totalResultados,
      totalResults: allData[1],
      totalPages: Math.ceil((allData[1]/parseFloat(filtro.totalResultados.toString()))),
      data: this.converterResultadosEventos(allData[0])
    };
  }

  obterSeries = async (filtro: SerieInput): Promise<IBaseResponse<ISerieData>> => {
    const allData = await AppDataSource.getRepository(Serie).findAndCount({
      take: filtro.totalResultados,
      skip: filtro.numeroPagina > 1 ? ((filtro.numeroPagina - 1) * filtro.totalResultados) : 0,
      relationLoadStrategy: "query",
      relations: { 
        characters: { character: {}},
        nextSerieMain: { },
        previousSerieMain: { },
      },
      select: {
        characters: true,
        nextSerieMain: true,
        previousSerieMain: true,
      },
      where: {
        id: filtro.idSerie ?? MoreThanOrEqual(1),
        title: filtro.nomeSerie ? ILike(`%${filtro.nomeSerie}%`) : ILike('%'),
        characters: {
          character: {
            name: filtro.nomePersonagem ? ILike(`%${filtro.nomePersonagem}%`) : ILike('%'),
          }
        }
      }
    });

    return {
      page: filtro.numeroPagina,
      limit: filtro.totalResultados,
      totalResults: allData[1],
      totalPages: Math.ceil(allData[1]/parseFloat(filtro.totalResultados.toString())),
      data: this.converterResultadosSeries(allData[0]),
    } 
  }

  obterStories = async (filtro: HistoriaInput): Promise<IBaseResponse<IStoryData>>  => {
    const allData = await AppDataSource.getRepository(Story).findAndCount({
      take: filtro.totalResultados,
      skip: filtro.numeroPagina > 1 ? ((filtro.numeroPagina - 1) * filtro.totalResultados) : 0,
      relationLoadStrategy: "query",
      relations: {
        characters: { character: {}},
        originalIssue: {}
      },
      select: {
        characters: true,
      },
      where: {
        id: filtro.idHistoria ?? MoreThanOrEqual(1),
        title: filtro.nomeHistoria ? ILike(`%${filtro.nomeHistoria}%`) : ILike('%'),
        characters: {
          character: {
            name: filtro.nomePersonagem ? ILike(`%${filtro.nomePersonagem}%`) : ILike('%'),
          }
        },
        originalIssue: {
          title: filtro.nomeQuadrinho ? ILike(`%${filtro.nomeQuadrinho}%`) : ILike('%'),
        }
      }
    });

    return {
      page: filtro.numeroPagina,
      limit: filtro.totalResultados,
      totalResults: allData[1],
      totalPages: Math.ceil(allData[1]/parseFloat(filtro.totalResultados.toString())),
      data: this.converterResultadosStorias(allData[0])
    };
  }

  private converterResultadosPersonagens(personagens: Character[]) {
    const response = personagens.map<ICharacterData>(personagem => ({
      id: personagem.id,
      name: personagem.name,
      description: personagem.description,
      resourceUri: personagem.resourceUri,
      thumbnail: personagem.thumbnail,
      modified: personagem.modified,
      comics: personagem.comics?.map<IExtendedComicModelResponse>(({comic}) => ({
        id: comic.id,
        diamondCode: comic.diamondCode,
        digitalId: comic.digitalId,
        ean: comic.ean,
        format: comic.format,
        isbn: comic.isbn,
        issn: comic.issn,
        issueNumber: comic.issueNumber,
        pageCount: comic.pageCount,
        resourceUri: comic.resourceUri,
        thumbnail: comic.thumbnail,
        title: comic.title,
        upc: comic.upc,
        description: comic.description,
        modified: comic.modified,
        variantDescription: comic.variantDescription,
        creators: comic.creators.map<ICreatorModelResponse>(creator => ({
          id: creator.creator.id,
          name: creator.creator.name,
          role: creator.role,
          resourceUri: creator.creator.resourceUri
        }))
      })) || [],
      events: personagem.events?.map<IEventModelResponse>(({event}) => ({
        id: event.id,
        title: event.title,
        resourceUri: event.resourceUri,
        description: event.description,
        end: event.end,
        modified: event.modified,
      })) || [],
      series: personagem.series?.map<ISerieModelResponse>(({serie}) => ({
        id: serie.id,
        title: serie.title,
        startYear: serie.startYear,
        endYear: serie.endYear,
        resourceUri: serie.resourceUri,
        description: serie.description,
        modified: serie.modified
      })) || [],
      stories: personagem.stories?.map<IStoryModelResponse>(({story}) => ({
        id: story.id,
        title: story.title,
        resourceUri: story.resourceUri,
        description: story.description,
        type: story.type,
        modified: story.modified
      })) || [],
    }));

    return response;
  }

  private converterResultadosQuadrinhos(quadrinhos: Comic[]){
    const response = quadrinhos.map<IComicData>(quadrinho => ({
      diamondCode: quadrinho.diamondCode,
      digitalId: quadrinho.digitalId,
      ean: quadrinho.ean,
      format: quadrinho.format,
      id: quadrinho.id,
      isbn: quadrinho.isbn,
      issn: quadrinho.issn,
      issueNumber: quadrinho.issueNumber,
      pageCount: quadrinho.pageCount,
      resourceUri: quadrinho.resourceUri,
      thumbnail: quadrinho.thumbnail,
      title: quadrinho.title,
      upc: quadrinho.upc,
      description: quadrinho.description,
      modified: quadrinho.modified,
      variantDescription: quadrinho.variantDescription,
      characters: quadrinho.characters?.map<ICharacterModelResponse>(({character}) => ({
        description: character.description,
        id: character.id,
        name: character.name,
        resourceUri: character.resourceUri,
        thumbnail: character.thumbnail,
        modified: character.modified
      })) || [],
      creators: quadrinho.creators?.map<ICreatorModelResponse>(creator => ({
        id: creator.creator.id,
        name: creator.creator.name,
        resourceUri: creator.creator.resourceUri,
        role: creator.role
      })) || [],
      stories: quadrinho.stories?.map<IStoryModelResponse>(story => ({
        id: story.id,
        resourceUri: story.resourceUri,
        title: story.title,
        type: story.type,
        description: story.description,
        modified: story.modified
      })) || []
    }));

    return response;
  }

  private converterResultadosEventos(eventos: Event[]){
    const response = eventos.map<IEventData>(event => ({
      id: event.id,
      resourceUri: event.resourceUri,
      title: event.title,
      description: event.description,
      end: event.end,
      modified: event.modified,
      start: event.start,
      characters: event.characters?.map(({character}) => ({
        description: character.description,
        id: character.id,
        name: character.name,
        resourceUri: character.resourceUri,
        thumbnail: character.thumbnail,
        modified: character.modified
      })) || [],
      nextEvent: event.nextEventMain.length > 0 ? {
        id: event.nextEventMain[0].id,
        resourceUri: event.nextEventMain[0].resourceUri,
        title: event.nextEventMain[0].title,
        description: event.nextEventMain[0].description,
        end: event.nextEventMain[0].end,
        modified: event.nextEventMain[0].modified,
        start: event.nextEventMain[0].start,
      } : null,
      previousEvent: event.previousEventMain.length > 0 ? {
        id: event.previousEventMain[0].id,
        resourceUri: event.previousEventMain[0].resourceUri,
        title: event.previousEventMain[0].title,
        description: event.previousEventMain[0].description,
        end: event.previousEventMain[0].end,
        modified: event.previousEventMain[0].modified,
        start: event.previousEventMain[0].start,
      } : null
    }));

    return response;
  }

  private converterResultadosSeries(series: Serie[]){
    const response = series.map<ISerieData>(serie => ({
      endYear: serie.endYear,
      id: serie.id,
      resourceUri: serie.resourceUri,
      startYear: serie.startYear,
      title: serie.title,
      description: serie.description,
      modified: serie.modified,
      characters: serie.characters?.map<ICharacterModelResponse>(({character}) => ({
        id: character.id,
        name: character.name,
        description: character.description,
        resourceUri: character.resourceUri,
        thumbnail: character.thumbnail,
        modified: character.modified,
      })) || [],
      nextSerie: serie.nextSerieMain.length > 0 ? {
        id: serie.nextSerieMain[0].id,
        endYear: serie.nextSerieMain[0].endYear,
        resourceUri: serie.nextSerieMain[0].resourceUri,
        startYear: serie.nextSerieMain[0].startYear,
        title: serie.nextSerieMain[0].title,
        description: serie.nextSerieMain[0].title,
        modified: serie.nextSerieMain[0].modified
      } : null,
      previounsSerie: serie.previousSerieMain.length > 0 ? {
        id: serie.previousSerieMain[0].id,
        endYear: serie.previousSerieMain[0].endYear,
        resourceUri: serie.previousSerieMain[0].resourceUri,
        startYear: serie.previousSerieMain[0].startYear,
        title: serie.previousSerieMain[0].title,
        description: serie.previousSerieMain[0].title,
        modified: serie.previousSerieMain[0].modified
      } : null,
    }));

    return response;
  }

  private converterResultadosStorias(storias: Story[]){
    const response = storias.map<IStoryData>(storia => ({
      id: storia.id,
      resourceUri: storia.resourceUri,
      title: storia.title,
      type: storia.type,
      description: storia.description,
      modified: storia.modified,
      characters: storia.characters?.map<ICharacterModelResponse>(({character}) => ({
        description: character.description,
        id: character.id,
        name: character.name,
        resourceUri: character.resourceUri,
        thumbnail: character.thumbnail,
        modified: character.modified,
      })) || [],
      originalIssue: storia.originalIssue ? {
        diamondCode: storia.originalIssue.diamondCode,
        digitalId: storia.originalIssue.digitalId,
        ean: storia.originalIssue.ean,
        format: storia.originalIssue.format,
        id: storia.originalIssue.id,
        isbn: storia.originalIssue.isbn,
        issn: storia.originalIssue.issn,
        issueNumber: storia.originalIssue.issueNumber,
        pageCount: storia.originalIssue.pageCount,
        resourceUri: storia.originalIssue.resourceUri,
        thumbnail: storia.originalIssue.thumbnail,
        title: storia.originalIssue.title,
        upc: storia.originalIssue.upc,
        description: storia.originalIssue.description,
        modified: storia.originalIssue.modified,
        variantDescription: storia.originalIssue.variantDescription
      } : null
    }));

    return response;
  }
}

export { DadosService };