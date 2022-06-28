import axios from 'axios';
import md5 from "blueimp-md5";
import { v4 as uuidv4 } from 'uuid';
import { Lifecycle, scoped } from 'tsyringe';
import { EntityManager} from 'typeorm';
import { AppDataSource } from '../../Dados/Data-Source';
import { Character } from '../../Negocio/Entidades/Character';
import { ICargaService } from '../Interfaces/ICargaService';
import { IMarvelCharacter, IMarvelCharactersResponse, IMarvelComicResponse, IMarvelEventResponse, IMarvelSeriesResponse, IMarvelStoryResponse, IMarvelEventSummary, IMarvelComic, IMarvelEvent, IMarvelSeries, IMarvelStory } from '../Responses/IMarvelResponse';
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

  private _charactersData = new Array<IMarvelCharacter>();
  private _comicData = new Array<IMarvelComic>();
  private _eventData = new  Array<IMarvelEvent>();
  private _serieData = new Array<IMarvelSeries>();
  private _storiesData = new Array<IMarvelStory>();
  
  
  aplicarCarga = async (): Promise<Object> => {

    await this.obterDadosGerais();
    
    await AppDataSource.manager.transaction(async (transactionalEntityManager) => {  
      await this.inserirPersonagens(transactionalEntityManager);
    });

    return {
      status: 'Carga feita com sucesso'
    };
  }

  private async obterDadosGerais(): Promise<void>{    
    const {data: dadosCharacters} = await axios.get<IMarvelCharacter[][]>('http://localhost:3001/characters');
    const {data: dadosComics } = await axios.get<IMarvelComic[][]>('http://localhost:3002/comics');
    const {data: dadosEvents } = await axios.get<IMarvelEvent[][]>('http://localhost:3003/events');
    const {data: dadosSeries } = await axios.get<IMarvelSeries[][]>('http://localhost:3004/series');
    const {data: dadosStories } = await axios.get<IMarvelStory[][]>('http://localhost:3005/stories');

    this._charactersData.push(...dadosCharacters.reduce((acum, curr) => {
      acum.push(...curr);
      return acum;
    }, new Array<IMarvelCharacter>()));

    this._comicData.push(...dadosComics.reduce((acum, curr) => {
      acum.push(...curr);
      return acum;
    }, new Array<IMarvelComic>()));

    this._eventData.push(...dadosEvents.reduce((acum, curr) => {
      acum.push(...curr);
      return acum;
    }, new Array<IMarvelEvent>()));

    this._serieData.push(...dadosSeries.reduce((acum, curr) => {
      acum.push(...curr);
      return acum;
    }, new Array<IMarvelSeries>()));

    this._storiesData.push(...dadosStories.reduce((acum, curr) => {
      acum.push(...curr);
      return acum;
    }, new Array<IMarvelStory>()));

    if(this._comicData.length === 0){
      for(let page = (this._charactersData.length/100) > 1 ? (this._charactersData.length/100) + 1 : 1; page <= 16; page++){
        console.log('Personagens adicionados ', this._charactersData.length);
        
        const personagensPagina = await this.obterDadosPersonagensAPI(page);
  
        await axios.post('http://localhost:3001/characters', personagensPagina.data.results);
  
        this._charactersData.push(...personagensPagina.data.results);
      }
    }

    console.log('Personagens Obtidos ', this._charactersData.length);

    if(this._eventData.length === 0){
      for(let page = (this._comicData.length/100) > 1 ? (this._comicData.length/100) + 1 : 1; page <= 524; page++){
        console.log('Quadrinhos adicionados ', this._comicData.length);
        
        const quadrinhosPagina = await this.obterDadosDetalhadosComicAPI(page);
  
        await axios.post('http://localhost:3002/comics', quadrinhosPagina.data.results);
  
        this._comicData.push(...quadrinhosPagina.data.results);
      }
    }

    console.log('Quadrinhos Obtidos ', this._comicData.length);

    if(this._serieData.length === 0){
      for(let page = (this._eventData.length/100) > 1 ? (this._eventData.length/100) + 1 : 1; page <= 1; page++){
        console.log('Eventos adicionados ', this._eventData.length);
        
        const eventosPagina = await this.obterDadosDetalhadosEventAPI(page);
  
        await axios.post('http://localhost:3003/events', eventosPagina.data.results);
  
        this._eventData.push(...eventosPagina.data.results);
      }
    }

    console.log('Eventos Obtidos ', this._eventData.length);

    if(this._storiesData.length === 0){
      for(let page = (this._serieData.length/100) > 1 ? (this._serieData.length/100) + 1 : 1; page <= 130; page++){
        console.log('Series adicionadas ', this._serieData.length);
        
        const seriesPagina = await this.obterDadosDetalhadosSeriesAPI(page);
  
        await axios.post('http://localhost:3004/series', seriesPagina.data.results);
  
        this._serieData.push(...seriesPagina.data.results);
      }
    }

    console.log('Series Obtidos ', this._serieData.length);

    for(let page = (this._storiesData.length/100) > 1 ? (this._storiesData.length/100) + 1 : 1; page <= 1210; page++){
      console.log('Stories adicionados ', this._storiesData.length);
      
      const storiesPagina = await this.obterDadosDetalhadosStoriesAPI(page);

      await axios.post('http://localhost:3005/stories', storiesPagina.data.results);

      this._storiesData.push(...storiesPagina.data.results);
    }

    console.log('Stories Obtidos ', this._storiesData.length);

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

  private async obterDadosDetalhadosComicAPI(page: number): Promise<IMarvelComicResponse>{
    let url = `comics?limit=100&offset=${(page - 1) * 100}`

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

  private async obterDadosDetalhadosEventAPI(page: number): Promise<IMarvelEventResponse>{
    let url = `events?limit=100&offset=${(page - 1) * 100}`

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

  private async obterDadosDetalhadosSeriesAPI(page: number): Promise<IMarvelSeriesResponse>{
    let url = `series?limit=100&offset=${(page - 1) * 100}`

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

  private async obterDadosDetalhadosStoriesAPI(page: number): Promise<IMarvelStoryResponse>{
    let url = `stories?limit=100&offset=${(page - 1) * 100}`

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

  private async inserirPersonagens(transactionalEntityManager: EntityManager):Promise<Character[]>{  
    let personagensAdicionados: Array<Character> = new Array<Character>();

    let counter = 0;
    
    for(const personagemAtual of this._charactersData){        
      const personagemInserido = await this.verificarPersonagem(personagemAtual, transactionalEntityManager)

      counter += 1;

      console.log('Personagens Inseridos: ', counter);
      
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

    try{
      const comicAPI = this._comicData.find(comic => comic.id === comicId);

      if(!comicAPI)
        return [];

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
    }catch{
      return [];
    }
  }

  private async inserirQuadrinho(idComic: number, transactionalEntityManager: EntityManager): Promise<Comic>{
    let quadrinhoAdicionado = new Comic()
  
    let quadrinhoBaseDeDados = await transactionalEntityManager.getRepository(Comic)
    .findOne({where: {
      id: idComic
    }});
    
    if(quadrinhoBaseDeDados){
      quadrinhoAdicionado = quadrinhoBaseDeDados;
    }
    else{
      const comicAPI = this._comicData.find(comic => comic.id === idComic);

      if(!comicAPI)
        return null;

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

      if(!quadrinhoAdicionado)
        continue;

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

      if(!relacaoQuadrinhoBaseDeDados){
        await transactionalEntityManager.getRepository(Character_Comics).save([relacaoQuadrinhoAdicionada]);
      }

      characterComics.push(relacaoQuadrinhoAdicionada);
    }

    return characterComics;
  }

  private async inserirEvento(idEvento: number, transactionalEntityManager: EntityManager): Promise<Event>{      
    let eventoAdicionado = new Event();

    let eventoBaseDeDados = await transactionalEntityManager.getRepository(Event)
    .findOne({where: {
      id: idEvento
    }});
  
    if(eventoBaseDeDados){
      eventoAdicionado = eventoBaseDeDados;
    }
    else{
      const eventAPI = this._eventData.find(event => event.id === idEvento);

      if(!eventAPI)
        return null;

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
      const eventAPI = this._eventData.find(event => event.id === +eventItem.resourceURI.split('/')[6]);

      if(!eventAPI)
        continue;

      let eventoAdicionado = await this.inserirEvento(+eventAPI.resourceURI.split('/')[6],transactionalEntityManager);

      if(eventAPI.next)
        eventoAdicionado.nextEvent = await this.inserirEvento(+eventAPI.next.resourceURI.split('/')[6], transactionalEntityManager)

      if(eventAPI.previous)
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

      if(!relacaoEventoBaseDeDados){
        await transactionalEntityManager.getRepository(Character_Events).save([relacaoEventoAdicionada]);
      }

      characterEvents.push(relacaoEventoAdicionada);
    }

    return characterEvents;
  }

  private async inserirSerie(idSerie: number, transactionalEntityManager: EntityManager): Promise<Serie>{
    let serieAdicionada = new Serie();
    
    let serieBaseDeDados = await transactionalEntityManager.getRepository(Serie)
    .findOne({where: {
      id: idSerie
    }});
    
    if(serieBaseDeDados){
      serieAdicionada = serieBaseDeDados;
      
    }else{
      const serieApi = this._serieData.find(serie => serie.id === idSerie);

      if(!serieApi)
        return null;

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
      return [];

    const characterSeries = new Array<Character_Series>();

    let personagemEncontrado = await transactionalEntityManager.getRepository(Character)
    .findOne({
      where: {
        id: personagem.id
      }
    });

    for(const serieItem of personagem.series.items){      
      const serieApi = this._serieData.find(serie => serie.id === +serieItem.resourceURI.split('/')[6]);

      if(!serieApi)
        continue;

      const serieAdicionada = await this.inserirSerie(+serieApi.resourceURI.split('/')[6], transactionalEntityManager);

      if(serieApi.next)
        serieAdicionada.nextSerie = await this.inserirSerie(+serieApi.next.resourceURI.split('/')[6], transactionalEntityManager);

      if(serieApi.previous)
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

      if(!relacaoSerieBaseDeDados){
        await transactionalEntityManager.getRepository(Character_Series).save([relacaoSerieAdicionada]);
      }

      characterSeries.push(relacaoSerieAdicionada);
    }

    return characterSeries;
  }

  private async verificarStorias(personagem: IMarvelCharacter, transactionalEntityManager: EntityManager): Promise<Character_Stories[]>{
    if(personagem.stories.items.length === 0)
      return [];

    const characterStories = new Array<Character_Stories>();

    let personagemEncontrado = await transactionalEntityManager.getRepository(Character)
      .findOne({
        where: {
          id: personagem.id
        }
      });

    for(const storyItem of personagem.stories.items){     
      let storyAdicionada = new Story();
  
      let storyBaseDeDados = await transactionalEntityManager.getRepository(Story)
        .findOne({where: {
          id: +storyItem.resourceURI.split('/')[6]
        }});
      
      if(storyBaseDeDados){
        storyAdicionada = storyBaseDeDados;
      }
      else{
        const storyAPI = this._storiesData.find(story => story.id === +storyItem.resourceURI.split('/')[6]);

        if(!storyAPI)
          continue;

        storyAdicionada.resourceUri = storyItem.resourceURI;
        storyAdicionada.type = storyItem.type;
        storyAdicionada.id = +storyItem.resourceURI.split('/')[6];
        storyAdicionada.description = storyAPI.description;
        storyAdicionada.modified = storyAPI.modified instanceof Date ? new Date(storyAPI.modified) : new Date();
        storyAdicionada.title = storyAPI.title;
        storyAdicionada.originalIssue = await this.inserirQuadrinho(+storyAPI.originalissue.resourceURI.split('/')[6], transactionalEntityManager);
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