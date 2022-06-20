import axios from 'axios';
import md5 from "blueimp-md5";
import { v4 as uuidv4 } from 'uuid';
import { Lifecycle, scoped } from 'tsyringe';
import { EntityManager} from 'typeorm';
import { AppDataSource } from '../../Dados/Data-Source';
import { Character } from '../../Negocio/Entidades/Character';
import { Image } from '../../Negocio/Entidades/Image';
import { ICharactersService } from '../Interfaces/ICharactersService';
import { IMarvelCharacter, IMarvelResponse } from '../Responses/IMarvelResponse';
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

@scoped(Lifecycle.ResolutionScoped)
class CharactersService implements ICharactersService{
  
  aplicarCarga = async (): Promise<Object> => {
    
    await AppDataSource.manager.transaction(async (transactionalEntityManager) => {
      for(let page = 1; page <= 16; page ++){      
        const personagens = await this.obterDadosAPI(page);
  
        await this.inserirPersonagens(personagens, transactionalEntityManager);
      }
    });

    return {
      status: 'Carga feita com sucesso'
    };
  }

  private async obterDadosAPI(page: number) : Promise<IMarvelResponse>{
    let url = `characters?limit=100&offset=${(page - 1) * 100}`

    const timeStamp = new Date().getTime();
    const hash = md5(`${timeStamp}${process.env.CHAVE_PRIVADA}${process.env.CHAVE_PUBLICA}`);
    
    const {data: personagens} = await axios.get<IMarvelResponse>(`${url}`, {
      baseURL: process.env.API_ENDERECO,
      params: {
        ts: timeStamp,
        hash: hash,
        apikey: process.env.CHAVE_PUBLICA
      }
    });

    return personagens
  }

  private async inserirPersonagens(personagens: IMarvelResponse, transactionalEntityManager: EntityManager):Promise<Character[]>{   
    let personagensAdicionados: Array<Character> = new Array<Character>();
    
    for(const personagemAtual of personagens.data.results){        
      personagensAdicionados.push(await this.verificarPersonagem(personagemAtual, transactionalEntityManager));
    }

    return personagensAdicionados;
  }

  private async verificarPersonagem(personagem: IMarvelCharacter, transactionalEntityManager: EntityManager): Promise<Character>{
    const personagemEncontrado = await this.obterPersonagemBaseDeDados(personagem, transactionalEntityManager);

    if(personagemEncontrado)
      return personagemEncontrado;

    let thumbnail = new Image();

    thumbnail.id = uuidv4();
    thumbnail.extension = personagem.thumbnail.extension;
    thumbnail.path = personagem.thumbnail.path;

    await transactionalEntityManager.getRepository(Image).save([thumbnail]);

    let personagemAdicionado = new Character();

    const verificarData = personagem.modified instanceof Date;

    personagemAdicionado.description = personagem.description;
    personagemAdicionado.id = personagem.id;
    personagemAdicionado.modified = verificarData ? new Date(personagem.modified) : new Date();
    personagemAdicionado.name = personagem.name;
    personagemAdicionado.resourceURI = personagem.resourceURI;
    personagemAdicionado.thumbnail = thumbnail;

    await transactionalEntityManager.getRepository(Character).save([personagemAdicionado]);

    let urls = new Array<Url>();

    personagem.urls.forEach(url => urls.push({
      character: personagemAdicionado,
      id: uuidv4(),
      type: url.type,
      url: url.url
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
      let quadrinhoAdicionado = new Comic();
      
      let quadrinhoBaseDeDados = await transactionalEntityManager.getRepository(Comic)
      .findOne({where: {
        resourceUri: comicItem.resourceURI
      }});
      
      if(quadrinhoBaseDeDados){
        quadrinhoAdicionado = quadrinhoBaseDeDados;
      }
      else{
        quadrinhoAdicionado.name = comicItem.name;
        quadrinhoAdicionado.resourceUri = comicItem.resourceURI;
        quadrinhoAdicionado.id = +comicItem.resourceURI.split('/')[6];
      }

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
        if(quadrinhoBaseDeDados === null)
          await transactionalEntityManager.getRepository(Comic).save([quadrinhoAdicionado]);

        await transactionalEntityManager.getRepository(Character_Comics).save([relacaoQuadrinhoAdicionada]);
      }

      characterComics.push(relacaoQuadrinhoAdicionada);
    }

    return characterComics;
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
      let eventoAdicionado = new Event();
      
      let eventoBaseDeDados = await transactionalEntityManager.getRepository(Event)
      .findOne({where: {
        resourceUri: eventItem.resourceURI
      }});
      
      if(eventoBaseDeDados){
        eventoAdicionado = eventoBaseDeDados;
      }
      else{
        eventoAdicionado.name = eventItem.name;
        eventoAdicionado.resourceUri = eventItem.resourceURI;
        eventoAdicionado.id = +eventItem.resourceURI.split('/')[6];
      }

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
        if(eventoBaseDeDados === null)
          await transactionalEntityManager.getRepository(Event).save([eventoAdicionado]);

        await transactionalEntityManager.getRepository(Character_Events).save([relacaoEventoAdicionada]);
      }

      characterEvents.push(relacaoEventoAdicionada);
    }

    return characterEvents;
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
      let serieAdicionada = new Serie();
      
      let serieBaseDeDados = await transactionalEntityManager.getRepository(Serie)
      .findOne({where: {
        resourceUri: serieItem.resourceURI
      }});
      
      if(serieBaseDeDados){
        serieAdicionada = serieBaseDeDados;
      }
      else{
        serieAdicionada.name = serieItem.name;
        serieAdicionada.resourceUri = serieItem.resourceURI;
        serieAdicionada.id = +serieItem.resourceURI.split('/')[6];
      }

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
        if(serieBaseDeDados === null)
          await transactionalEntityManager.getRepository(Serie).save([serieAdicionada]);

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
      
      let storyBaseDeDados = await transactionalEntityManager.getRepository(Story)
      .findOne({where: {
        resourceUri: storyItem.resourceURI
      }});
      
      if(storyBaseDeDados){
        storyAdicionada = storyBaseDeDados;
      }
      else{
        storyAdicionada.name = storyItem.name;
        storyAdicionada.resourceUri = storyItem.resourceURI;
        storyAdicionada.type = storyItem.type;
        storyAdicionada.id = +storyItem.resourceURI.split('/')[6];
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
        resourceURI: personagem.resourceURI,
        thumbnail: {
          extension: personagem.thumbnail.extension,
          id: personagem.thumbnail.id,
          path: personagem.thumbnail.path
        },
        urls: personagem.urls.map(url => ({
          id: url.id,
          type: url.type,
          url: url.url
        })),
        stories: personagem.stories ? personagem.stories.map(story => ({
          id: story.story.id,
          name: story.story.name,
          resourceUri: story.story.resourceUri,
          type: story.story.type
        })) : [],
        events: personagem.events ? personagem.events.map(event => ({
          id: event.event.id,
          name: event.event.name,
          resourceUri: event.event.resourceUri
        })) : [],
        comics: personagem.comics ? personagem.comics.map(comic => ({
          id: comic.comic.id,
          name: comic.comic.name,
          resourceURI: comic.comic.resourceUri
        })) : [],
        series: personagem.series ? personagem.series.map(serie => ({
          id: serie.serie.id,
          name: serie.serie.name,
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
      thumbnail: true,
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

export { CharactersService };