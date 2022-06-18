import axios from 'axios';
import md5 from "blueimp-md5";
import { Lifecycle, scoped } from 'tsyringe';
import { EntityManager, getRepository } from 'typeorm';
import { AppDataSource } from '../../Dados/Data-Source';
import { Character } from '../../Negocio/Entidades/Character';
import { ICharactersService } from '../Interfaces/ICharactersService';
import { ICharacter, IMarvelResponse } from '../Responses/IMarvelResponse';

@scoped(Lifecycle.ResolutionScoped)
class CharactersService implements ICharactersService{
  aplicarCarga = async (page: number) => {
    const personagens = await this.obterDadosAPI(page);

    const personagensBaseDeDados = await this.inserirPersonagens(personagens);

    return personagensBaseDeDados;
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

  private async inserirPersonagens(personagens: IMarvelResponse):Promise<Character[]>{   
    let personagensAdicionados: Array<Character> = new Array<Character>();
    
    await AppDataSource.manager.transaction(async (transactionalEntityManager) => {
      for(let i = 0; i < personagens.data.count; i++){
        const personagemAtual = personagens.data.results[i];
        
        personagensAdicionados.push(await this.verificarPersonagem(personagemAtual, transactionalEntityManager));
      }
    });

    return personagensAdicionados;
  }

  private async verificarPersonagem(personagem: ICharacter, transactionalEntityManager: EntityManager): Promise<Character>{
    const personagemEncontrado = await transactionalEntityManager.getRepository(Character).findOne({where: {
      id: personagem.id
    }});

    if(personagemEncontrado)
      return personagemEncontrado;

    const personagemAdicionado = new Character();

    personagemAdicionado.description = personagem.description;
    personagemAdicionado.id = personagem.id;
    personagemAdicionado.modified = personagem.modified;
    personagemAdicionado.name = personagem.name;
    personagemAdicionado.resourceURI = personagem.resourceURI;

    await transactionalEntityManager.getRepository(Character).save([personagemAdicionado]);

    return personagemAdicionado;
  }
}

export { CharactersService };