import { container } from 'tsyringe';
import { ICharactersService } from '../../../Aplicacao/Interfaces/ICharactersService';
import { CharactersService } from '../../../Aplicacao/Services/Characters.Service';

container.register<ICharactersService>('CharactersService', {useValue: new CharactersService()});