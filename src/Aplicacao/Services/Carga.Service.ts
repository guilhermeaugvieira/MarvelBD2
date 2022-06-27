import axios from 'axios';
import md5 from "blueimp-md5";
import { v4 as uuidv4 } from 'uuid';
import { Lifecycle, scoped } from 'tsyringe';
import { EntityManager} from 'typeorm';
import { AppDataSource } from '../../Dados/Data-Source';
import { Character } from '../../Negocio/Entidades/Character';
import { ICargaService } from '../Interfaces/ICargaService';
import { IMarvelCharacter, IMarvelCharactersResponse, IMarvelComicResponse, IMarvelEventResponse, IMarvelSeriesResponse, IMarvelStoryResponse, IMarvelEventSummary } from '../Responses/IMarvelResponse';
import { Url } from '../../Negocio/Entidades/Url';
import { IChargeResponse } from '../Responses/IChargeResponse';
import { Character_Comics } from '../../Negocio/Entidades/Character_Comics';
import { Comic } from '../../Negocio/Entidades/Comic';
import { Character_Events } from '../../Negocio/Entidades/Character_Events';
import { Event } from '../../Negocio/Entidades/Event';
import { Character_Series } from '../../Negocio/Entidades/Character_Series';
import { Serie } from '../../Negocio/Entidades/Serie';
import { Character_Stories } from '../../Negocio/Entidades/Character_Stories';
import { Story } from '../../Negocio/Entidades/Story';
import { Comic_Creators } from '../../Negocio/Entidades/Comic_Creators';
import { Creator } from '../../Negocio/Entidades/Creator';

@scoped(Lifecycle.ResolutionScoped)
class CargaService implements ICargaService{

  private counter = 0;
  
  aplicarCarga = async (): Promise<Object> => {
    
    await AppDataSource.manager.transaction(async (transactionalEntityManager) => {
      for(let page = 1; page <= 16; page ++){      
        const personagens = await this.obterDadosPersonagensAPI(page);
  
        await this.inserirPersonagens(personagens, transactionalEntityManager);
      }
    });

    return {
      status: 'Carga feita com sucesso'
    };
  }

  private async obterDadosPersonagensAPI(page: number) : Promise<IMarvelCharactersResponse>{
    let url = `characters?limit=100&offset=${(page - 1) * 100}`

    const timeStamp = new Date().getTime();
    const hash = md5(`${timeStamp}${process.env.CHAVE_PRIVADA}${process.env.CHAVE_PUBLICA}`);
    
    const {data: personagens} = await axios.get<IMarvelCharactersResponse>(`${url}`, {
      baseURL: process.env.API_ENDERECO,
      params: {
        ts: timeStamp,
        hash: hash,
        apikey: process.env.CHAVE_PUBLICA
      }
    });

    return personagens
  }

  private async obterDadosDetalhadosComicAPI(id: number): Promise<IMarvelComicResponse>{
    let url = `comics/${id}`

    const timeStamp = new Date().getTime();
    const hash = md5(`${timeStamp}${process.env.CHAVE_PRIVADA}${process.env.CHAVE_PUBLICA}`);
    
    const {data: comic} = await axios.get<IMarvelComicResponse>(`${url}`, {
      baseURL: process.env.API_ENDERECO,
      params: {
        ts: timeStamp,
        hash: hash,
        apikey: process.env.CHAVE_PUBLICA
      }
    });

    return comic;
  }

  private async obterDadosDetalhadosEventAPI(id: number): Promise<IMarvelEventResponse>{
    let url = `events/${id}`

    const timeStamp = new Date().getTime();
    const hash = md5(`${timeStamp}${process.env.CHAVE_PRIVADA}${process.env.CHAVE_PUBLICA}`);
    
    const {data: event} = await axios.get<IMarvelEventResponse>(`${url}`, {
      baseURL: process.env.API_ENDERECO,
      params: {
        ts: timeStamp,
        hash: hash,
        apikey: process.env.CHAVE_PUBLICA
      }
    });

    return event;
  }

  private async obterDadosDetalhadosSeriesAPI(id: number): Promise<IMarvelSeriesResponse>{
    let url = `series/${id}`

    const timeStamp = new Date().getTime();
    const hash = md5(`${timeStamp}${process.env.CHAVE_PRIVADA}${process.env.CHAVE_PUBLICA}`);
    
    const {data: serie} = await axios.get<IMarvelSeriesResponse>(`${url}`, {
      baseURL: process.env.API_ENDERECO,
      params: {
        ts: timeStamp,
        hash: hash,
        apikey: process.env.CHAVE_PUBLICA
      }
    });

    return serie;
  }

  private async obterDadosDetalhadosStoriesAPI(id: number): Promise<IMarvelStoryResponse>{
    let url = `stories/${id}`

    const timeStamp = new Date().getTime();
    const hash = md5(`${timeStamp}${process.env.CHAVE_PRIVADA}${process.env.CHAVE_PUBLICA}`);
    
    const {data: story} = await axios.get<IMarvelStoryResponse>(`${url}`, {
      baseURL: process.env.API_ENDERECO,
      params: {
        ts: timeStamp,
        hash: hash,
        apikey: process.env.CHAVE_PUBLICA
      }
    });

    return story;
  }

  private async inserirPersonagens(personagens: IMarvelCharactersResponse, transactionalEntityManager: EntityManager):Promise<Character[]>{   
    let personagensAdicionados: Array<Character> = new Array<Character>();
    
    for(const personagemAtual of personagens.data.results){        
      const personagemInserido = await this.verificarPersonagem(personagemAtual, transactionalEntityManager)

      this.counter += 1;

      console.log('Personagens Adicionados: ', this.counter);
      
      personagensAdicionados.push(personagemInserido);
    }

    return personagensAdicionados;
  }

  private async verificarPersonagem(personagem: IMarvelCharacter, transactionalEntityManager: EntityManager): Promise<Character>{
    const personagemEncontrado = await this.obterPersonagemBaseDeDados(personagem, transactionalEntityManager);

    if(personagemEncontrado)
      return personagemEncontrado;

    let personagemAdicionado = new Character();

    const verificarData = personagem.modified instanceof Date;

    personagemAdicionado.description = personagem.description;
    personagemAdicionado.id = personagem.id;
    personagemAdicionado.modified = verificarData ? new Date(personagem.modified) : new Date();
    personagemAdicionado.name = personagem.name;
    personagemAdicionado.resourceUri = personagem.resourceURI;
    personagemAdicionado.thumbnail = `${personagem.thumbnail.path}.${personagem.thumbnail.extension}`;

    await transactionalEntityManager.getRepository(Character).save([personagemAdicionado]);

    let urls = new Array<Url>();

    personagem.urls.forEach(url => urls.push({
      id: uuidv4(),
      type: url.type,
      url: url.url,
    }));

    await transactionalEntityManager.getRepository(Url).save(urls);

    personagemAdicionado.urls = urls;

    personagemAdicionado.comics = new Array<Character_Comics>();
    personagemAdicionado.events = new Array<Character_Events>();
    personagemAdicionado.series = new Array<Character_Series>();
    personagemAdicionado.stories = new Array<Character_Stories>();

    personagemAdicionado.comics = await this.verificarRevistas(personagem, transactionalEntityManager);
    personagemAdicionado.events = await this.verificarEventos(personagem, transactionalEntityManager);
    personagemAdicionado.series = await this.verificarSeries(personagem, transactionalEntityManager);
    personagemAdicionado.stories = await this.verificarStorias(personagem, transactionalEntityManager);

    return personagemAdicionado;
  }

  private async verificarCreators(comicId: number, transactionalEntityManager: EntityManager): Promise<Comic_Creators[]>{
    let criadoresQuadrinho = new Array<Comic_Creators>();

    const {data: comicResult} = await this.obterDadosDetalhadosComicAPI(comicId);
    const comicAPI = comicResult.results[0];

    const quadrinho = await transactionalEntityManager.getRepository(Comic).findOne({where: {id: comicId}});

    for(let creator of comicAPI.creators.items){
      let creatorAdicionado = new Creator();
      
      let creatorBaseDeDados = await transactionalEntityManager.getRepository(Creator)
        .findOne({where: {id: +creator.resourceURI.split('/')[6]}});

      if(creatorBaseDeDados)
        creatorAdicionado = creatorBaseDeDados;
      else{
        creatorAdicionado.id = +creator.resourceURI.split('/')[6];
        creatorAdicionado.name = creator.name;
        creatorAdicionado.resourceUri = creator.resourceURI
      }

      let relacaoQuadrinhoCriadorAdicionada = new Comic_Creators();

      let relacaoQuadrinhoCriadorBaseDeDados = await transactionalEntityManager.getRepository(Comic_Creators)
        .findOne({where: {comic: quadrinho, creator: creatorAdicionado}});

      if(relacaoQuadrinhoCriadorBaseDeDados)
        relacaoQuadrinhoCriadorAdicionada = relacaoQuadrinhoCriadorBaseDeDados;
      else{
        relacaoQuadrinhoCriadorAdicionada.comic = quadrinho;
        relacaoQuadrinhoCriadorAdicionada.creator = creatorAdicionado;
        relacaoQuadrinhoCriadorAdicionada.role = creator.role
        relacaoQuadrinhoCriadorAdicionada.id = uuidv4();
      }

      if(!relacaoQuadrinhoCriadorBaseDeDados){
        if(!creatorBaseDeDados)
          await transactionalEntityManager.getRepository(Creator).save([creatorAdicionado]);

        await transactionalEntityManager.getRepository(Comic_Creators).save([relacaoQuadrinhoCriadorAdicionada]);
      }

      criadoresQuadrinho.push(relacaoQuadrinhoCriadorAdicionada);
    }

    return criadoresQuadrinho;
  }

  private async inserirQuadrinho(idComic: number, transactionalEntityManager: EntityManager): Promise<Comic>{
    let quadrinhoAdicionado = new Comic()
    
    const {data: comicResult} = await this.obterDadosDetalhadosComicAPI(idComic);
    const comicAPI = comicResult.results[0];
    
    let quadrinhoBaseDeDados = await transactionalEntityManager.getRepository(Comic)
    .findOne({where: {
      resourceUri: comicAPI.resourceURI
    }});
    
    if(quadrinhoBaseDeDados){
      quadrinhoAdicionado = quadrinhoBaseDeDados;
    }
    else{
      const urlsQuadrinho: Array<Url> = comicAPI.urls.map(url => ({
        id: uuidv4(),
        type: url.type,
        url: url.url
      }));

      await transactionalEntityManager.getRepository(Url).save(urlsQuadrinho);
      
      quadrinhoAdicionado.resourceUri = comicAPI.resourceURI;
      quadrinhoAdicionado.id = idComic;
      quadrinhoAdicionado.description = comicAPI.description;
      quadrinhoAdicionado.diamondCode = comicAPI.diamondCode;
      quadrinhoAdicionado.digitalId = comicAPI.digitalId;
      quadrinhoAdicionado.ean = comicAPI.ean;
      quadrinhoAdicionado.format = comicAPI.format;
      quadrinhoAdicionado.isbn = comicAPI.isbn;
      quadrinhoAdicionado.issn = comicAPI.issn;
      quadrinhoAdicionado.issueNumber = comicAPI.issueNumber;
      quadrinhoAdicionado.modified = comicAPI.modified instanceof Date ? new Date(comicAPI.modified) : new Date();
      quadrinhoAdicionado.pageCount = comicAPI.pageCount;
      quadrinhoAdicionado.title = comicAPI.title;
      quadrinhoAdicionado.upc = comicAPI.upc;
      quadrinhoAdicionado.variantDescription = comicAPI.variantDescription;
      quadrinhoAdicionado.urls = urlsQuadrinho;
      quadrinhoAdicionado.thumbnail = `${comicAPI.thumbnail.path}.${comicAPI.thumbnail.extension}`;
    }

    if(!quadrinhoBaseDeDados)
      await transactionalEntityManager.getRepository(Comic).save([quadrinhoAdicionado]);

    quadrinhoAdicionado.creators = await this.verificarCreators(quadrinhoAdicionado.id, transactionalEntityManager);

    return quadrinhoAdicionado;
  }

  private async verificarRevistas(personagem: IMarvelCharacter, transactionalEntityManager: EntityManager): Promise<Character_Comics[]>{
    if(personagem.comics.items.length === 0)
      return

    const characterComics = new Array<Character_Comics>();

    let personagemEncontrado = await transactionalEntityManager.getRepository(Character)
    .findOne({
      where: {
        id: personagem.id
      }
    });

    for(const comicItem of personagem.comics.items){     
      const quadrinhoAdicionado = await this.inserirQuadrinho(+comicItem.resourceURI.split('/')[6], transactionalEntityManager);

      let relacaoQuadrinhoAdicionada = new Character_Comics();
      
      let relacaoQuadrinhoBaseDeDados = await transactionalEntityManager.getRepository(Character_Comics)
        .findOne({where: {
          character: personagemEncontrado,
          comic: quadrinhoAdicionado
        }});

      if(relacaoQuadrinhoBaseDeDados)
        relacaoQuadrinhoAdicionada = relacaoQuadrinhoBaseDeDados
      else{
        relacaoQuadrinhoAdicionada.character = personagemEncontrado;
        relacaoQuadrinhoAdicionada.comic = quadrinhoAdicionado;
        relacaoQuadrinhoAdicionada.id = uuidv4();
      }

      if(relacaoQuadrinhoBaseDeDados === null){
        await transactionalEntityManager.getRepository(Character_Comics).save([relacaoQuadrinhoAdicionada]);
      }

      characterComics.push(relacaoQuadrinhoAdicionada);
    }

    return characterComics;
  }

  private async inserirEvento(idEvento: number, transactionalEntityManager: EntityManager): Promise<Event>{
    const {data: eventResult} = await this.obterDadosDetalhadosEventAPI(idEvento);
    const eventAPI = eventResult.results[0];
      
    let eventoAdicionado = new Event();
    
    let eventoBaseDeDados = await transactionalEntityManager.getRepository(Event)
      .findOne({where: {
        id: idEvento
      }});
    
    if(eventoBaseDeDados){
      eventoAdicionado = eventoBaseDeDados;
    }
    else{
      const urlsEvento: Array<Url> = eventAPI.urls.map(url => ({
        id: uuidv4(),
        type: url.type,
        url: url.url
      }));

      await transactionalEntityManager.getRepository(Url).save(urlsEvento);

      eventoAdicionado.resourceUri = eventAPI.resourceURI;
      eventoAdicionado.id = idEvento;
      eventoAdicionado.urls = urlsEvento;
      eventoAdicionado.description = eventAPI.description;
      eventoAdicionado.end = eventAPI.end instanceof Date ? new Date(eventAPI.end) : new Date();
      eventoAdicionado.modified = eventAPI.modified instanceof Date ? new Date(eventAPI.modified) : new Date();
      eventoAdicionado.start = eventAPI.start instanceof Date ? new Date(eventAPI.start) : new Date();
      eventoAdicionado.title = eventAPI.title;

      await transactionalEntityManager.getRepository(Event).save([eventoAdicionado]);
    }

    return eventoAdicionado;
  }

  private async verificarEventos(personagem: IMarvelCharacter, transactionalEntityManager: EntityManager): Promise<Character_Events[]>{
    if(personagem.events.items.length === 0)
      return

    const characterEvents = new Array<Character_Events>();

    let personagemEncontrado = await transactionalEntityManager.getRepository(Character)
    .findOne({
      where: {
        id: personagem.id
      }
    });

    for(const eventItem of personagem.events.items){     
      let eventoAdicionado = await this.inserirEvento(+eventItem.resourceURI.split('/')[6],transactionalEntityManager);
      
      const {data: eventResult} = await this.obterDadosDetalhadosEventAPI(+eventItem.resourceURI.split('/')[6]);
      const eventAPI = eventResult.results[0];

      if(eventAPI.next !== null)
        eventoAdicionado.nextEvent = await this.inserirEvento(+eventAPI.next.resourceURI.split('/')[6], transactionalEntityManager)

      if(eventAPI.previous !== null)
        eventoAdicionado.previousEvent = await this.inserirEvento(+eventAPI.previous.resourceURI.split('/')[6], transactionalEntityManager)

      let relacaoEventoAdicionada = new Character_Events();
      
      let relacaoEventoBaseDeDados = await transactionalEntityManager.getRepository(Character_Events)
        .findOne({where: {
          character: personagemEncontrado,
          event: eventoAdicionado
        }});

      if(relacaoEventoBaseDeDados)
        relacaoEventoAdicionada = relacaoEventoBaseDeDados
      else{
        relacaoEventoAdicionada.character = personagemEncontrado;
        relacaoEventoAdicionada.event = eventoAdicionado;
        relacaoEventoAdicionada.id = uuidv4();
      }

      if(relacaoEventoBaseDeDados === null){
        await transactionalEntityManager.getRepository(Character_Events).save([relacaoEventoAdicionada]);
      }

      characterEvents.push(relacaoEventoAdicionada);
    }

    return characterEvents;
  }

  private async inserirSerie(idSerie: number, transactionalEntityManager: EntityManager): Promise<Serie>{
    let serieAdicionada = new Serie();

    const { data: serieResult} = await this.obterDadosDetalhadosSeriesAPI(idSerie);
    const serieApi = serieResult.results[0];
      
    let serieBaseDeDados = await transactionalEntityManager.getRepository(Serie)
    .findOne({where: {
      resourceUri: serieApi.resourceURI
    }});
    
    if(serieBaseDeDados){
      serieAdicionada = serieBaseDeDados;
    }else{
      const urlsSerie: Array<Url> = serieApi.urls.map(url => ({
        id: uuidv4(),
        type: url.type,
        url: url.url
      }));
      
      serieAdicionada.resourceUri = serieApi.resourceURI;
      serieAdicionada.id = idSerie;
      serieAdicionada.description = serieApi.description;
      serieAdicionada.endYear = serieApi.endYear;
      serieAdicionada.modified = serieApi.modified instanceof Date ? new Date(serieApi.modified) : new Date();
      serieAdicionada.startYear = serieApi.startYear;
      serieAdicionada.title = serieApi.title;
      serieAdicionada.urls = urlsSerie;
    }

    await transactionalEntityManager.getRepository(Serie).save([serieAdicionada]);

    return serieAdicionada;
  }

  private async verificarSeries(personagem: IMarvelCharacter, transactionalEntityManager: EntityManager): Promise<Character_Series[]>{
    if(personagem.series.items.length === 0)
    return

    const characterSeries = new Array<Character_Series>();

    let personagemEncontrado = await transactionalEntityManager.getRepository(Character)
    .findOne({
      where: {
        id: personagem.id
      }
    });

    for(const serieItem of personagem.series.items){
      
      const { data: serieResult} = await this.obterDadosDetalhadosSeriesAPI(+serieItem.resourceURI.split('/')[6]);
      const serieApi = serieResult.results[0];

      const serieAdicionada = await this.inserirSerie(+serieApi.resourceURI.split('/')[6], transactionalEntityManager);

      if(serieApi.next !== null)
        serieAdicionada.nextSerie = await this.inserirSerie(+serieApi.next.resourceURI.split('/')[6], transactionalEntityManager);

      if(serieApi.previous !== null)
        serieAdicionada.previousSerie = await this.inserirSerie(+serieApi.previous.resourceURI.split('/')[6], transactionalEntityManager);

      let relacaoSerieAdicionada = new Character_Series();
      
      let relacaoSerieBaseDeDados = await transactionalEntityManager.getRepository(Character_Series)
        .findOne({where: {
          character: personagemEncontrado,
          serie: serieAdicionada
        }});

      if(relacaoSerieBaseDeDados)
        relacaoSerieAdicionada = relacaoSerieBaseDeDados
      else{
        relacaoSerieAdicionada.character = personagemEncontrado;
        relacaoSerieAdicionada.serie = serieAdicionada;
        relacaoSerieAdicionada.id = uuidv4();
      }

      if(relacaoSerieBaseDeDados === null){
        await transactionalEntityManager.getRepository(Character_Series).save([relacaoSerieAdicionada]);
      }

      characterSeries.push(relacaoSerieAdicionada);
    }

    return characterSeries;
  }

  private async verificarStorias(personagem: IMarvelCharacter, transactionalEntityManager: EntityManager): Promise<Character_Stories[]>{
    if(personagem.stories.items.length === 0)
    return

    const characterStories = new Array<Character_Stories>();

    let personagemEncontrado = await transactionalEntityManager.getRepository(Character)
    .findOne({
      where: {
        id: personagem.id
      }
    });

    for(const storyItem of personagem.stories.items){     
      let storyAdicionada = new Story();

      const { data: storyResult} = await this.obterDadosDetalhadosStoriesAPI(+storyItem.resourceURI.split('/')[6]);
      const storyAPI = storyResult.results[0];
      
      let storyBaseDeDados = await transactionalEntityManager.getRepository(Story)
      .findOne({where: {
        resourceUri: storyItem.resourceURI
      }});
      
      if(storyBaseDeDados){
        storyAdicionada = storyBaseDeDados;
      }
      else{
        storyAdicionada.resourceUri = storyItem.resourceURI;
        storyAdicionada.type = storyItem.type;
        storyAdicionada.id = +storyItem.resourceURI.split('/')[6];
        storyAdicionada.description = storyAPI.description;
        storyAdicionada.modified = storyAPI.modified instanceof Date ? new Date(storyAPI.modified) : new Date();
        storyAdicionada.title = storyAPI.title;
      }

      let relacaoStoryAdicionada = new Character_Stories();
      
      let relacaoStoryBaseDeDados = await transactionalEntityManager.getRepository(Character_Stories)
        .findOne({where: {
          character: personagemEncontrado,
          story: storyAdicionada
        }});

      if(relacaoStoryBaseDeDados)
        relacaoStoryAdicionada = relacaoStoryBaseDeDados;
      else{
        relacaoStoryAdicionada.character = personagemEncontrado;
        relacaoStoryAdicionada.story = storyAdicionada;
        relacaoStoryAdicionada.id = uuidv4();
      }

      if(relacaoStoryBaseDeDados === null){
        if(storyBaseDeDados === null)
          await transactionalEntityManager.getRepository(Story).save([storyAdicionada]);

        await transactionalEntityManager.getRepository(Character_Stories).save([relacaoStoryAdicionada]);
      }

      characterStories.push(relacaoStoryAdicionada);
    }

    return characterStories;
    
  }

  private converterResultados(personagens: Character[]): IChargeResponse[]{
    let response: IChargeResponse[] = new Array<IChargeResponse>();

    personagens.forEach(personagem => {
      response.push({
        id: personagem.id,
        description: personagem.description,
        modified: personagem.modified,
        name: personagem.name,
        resourceURI: personagem.resourceUri,
        thumbnail: personagem.thumbnail,
        urls: personagem.urls.map(url => ({
          id: url.id,
          type: url.type,
          url: url.url
        })),
        stories: personagem.stories ? personagem.stories.map(story => ({
          id: story.story.id,
          resourceUri: story.story.resourceUri,
          type: story.story.type
        })) : [],
        events: personagem.events ? personagem.events.map(event => ({
          id: event.event.id,
          resourceUri: event.event.resourceUri
        })) : [],
        comics: personagem.comics ? personagem.comics.map(comic => ({
          id: comic.comic.id,
          resourceURI: comic.comic.resourceUri
        })) : [],
        series: personagem.series ? personagem.series.map(serie => ({
          id: serie.serie.id,
          resourceUri: serie.serie.resourceUri
        })) : []
      })
    });

    return response;
  }

  private async obterPersonagemBaseDeDados(personagem: IMarvelCharacter, transactionalEntityManager: EntityManager){
    const personagens =  await transactionalEntityManager.getRepository(Character).findOne({where: {
      id: personagem.id
    },
    relations: {
      urls: true,
      comics: {
        comic: true,
        character: false,
      },
      stories: {
        story: true,
        character: false,
      },
      events: {
        event: true,
        character: false,
      },
      series: {
        serie: true,
        character: false,
      }
    }});

    return personagens;
  }
}

export { CargaService };