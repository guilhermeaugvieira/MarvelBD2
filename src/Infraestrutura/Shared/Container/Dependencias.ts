import { container } from 'tsyringe';
import { ICargaService } from '../../../Aplicacao/Interfaces/ICargaService';
import { CargaService } from '../../../Aplicacao/Services/Carga.Service';

container.register<ICargaService>('CharactersService', {useValue: new CargaService()});