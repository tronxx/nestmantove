import { Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Any, Repository } from 'typeorm';
import { CreateServMantoDto, EditServMantosDto, CreateMantoxVehiculoDto } from './dtos';
import { ServMantos, ServmantosxVehiculo } from './entities';
 
@Injectable()
export class  ServmantosService {

    constructor (
        @InjectRepository(ServMantos)
        private readonly servmantosRepository: Repository<ServMantos>,
        @InjectRepository(ServmantosxVehiculo)
        private readonly servmantoxvehiRepository: Repository <ServmantosxVehiculo>
    )
    {}

    async getMany() :Promise <ServMantos[]>  {
        return await this.servmantosRepository.find();
    }

    async getManyCia(cia:number) :Promise <ServMantos[]>  {
        return await this.servmantosRepository.find(
            {
                where: { cia : cia},
                order: { clave: "ASC"}
            }
        );
    }

    async getManyMantosxVehi(idservmanto:number) :Promise <ServmantosxVehiculo[]>  {
        return await this.servmantoxvehiRepository.find(
            {
                where: { idservmanto : idservmanto},
                order: { idvehiculo: "ASC"}
            }
        );
    }

    async getOne(cia: number, id: number) : Promise<ServMantos> {
        const servmanto = await this.servmantosRepository.findOneBy({cia, id});
        if(!servmanto) throw new NotFoundException ('Servicio Inexistente');
       return servmanto;
    }

    async editOne(id: number, dto: EditServMantosDto) {
        const servmanto = await this.servmantosRepository.findOneBy({id});
        if(!servmanto) throw new NotFoundException ('Servicio Inexistente');
        const editedServmnto  = Object.assign(servmanto, dto);
        return await this.servmantosRepository.update(id, editedServmnto);

    }

    async deleteOne(id: number) {
        const servmanto = await this.servmantosRepository.findOneBy({id});
        if(!servmanto) throw new NotFoundException ('Servicio Inexistente');
        return await this.servmantosRepository.delete(id);

    }

    async createOne(dto: CreateServMantoDto) {
        let clave = dto.clave;
        let cia = dto.cia;

        const xservmanto = await this.servmantosRepository.findOneBy({cia, clave});
        if(xservmanto)  { 
            throw new NotAcceptableException ('Servicio ya Existe');
            return;
        }
        const servmanto = this.servmantosRepository.create(dto);
        const minvoservmanto = await this.servmantosRepository.save(servmanto);
        return minvoservmanto;
    }

   async createServMantosxVehi(idservmanto:number, servmantosxvehi: any[]) {
         
        let mantosxvehi: any[] = [];
        const query = await this.servmantoxvehiRepository.createQueryBuilder('a')
        .delete()
        .where("idservmanto= :idservmanto", {idservmanto})
        .execute();

        for(let miservxvehi of servmantosxvehi) {
            const minvosrvxvehi = {
                idvehiculo: miservxvehi.idvehiculo,
                idservmanto: miservxvehi.idservmanto,
                xcada: miservxvehi.xcada,
                cia: miservxvehi.cia
            }
            const minvoservmanto = await this.createMantoServixVehiculo(minvosrvxvehi);
            //console.log('Agregado:', minvoservmanto);
            
            mantosxvehi.push(minvoservmanto);
        }
        return mantosxvehi;
    }

    async createMantoServixVehiculo(dto: CreateMantoxVehiculoDto) {
        const servmantoxvehi = this.servmantoxvehiRepository.create(dto);
        return await this.servmantoxvehiRepository.save(servmantoxvehi);
    }

}
