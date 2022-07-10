import { container } from 'tsyringe';
import { ICargaService } from '../../../Aplicacao/Interfaces/ICargaService';
import { IDadosService } from '../../../Aplicacao/Interfaces/IDadosService';
import { IJMeterService } from '../../../Aplicacao/Interfaces/IJMeterService';
import { CargaService } from '../../../Aplicacao/Services/Carga.Service';
import { DadosService } from '../../../Aplicacao/Services/Dados.Service';
import { JMeterService } from '../../../Aplicacao/Services/JMeter.Service';

container.register<ICargaService>('CargaService', {useValue: new CargaService()});
container.register<IJMeterService>('JMeterService', {useValue: new JMeterService()});
container.register<IDadosService>('DadosService', {useValue: new DadosService()});