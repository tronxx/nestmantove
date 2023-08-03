import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { stringify } from 'querystring';
import { AccesoriosService } from './accesorios.service'
@ApiTags('accesorios')
@Controller('accesorios')
export class AccesoriosController {

    constructor (private readonly accesoriosService: AccesoriosService) {}

    @Get()
    async definiendo (
        @Query('modo') modo: string,
        @Query('idcombust') idcombust: number,
        @Query('idvehiculo') idvehiculo: number,
        @Query('fecha') fecha: string,

    ): Promise<any> {
        // console.log("modo:", modo);
        
        if(modo == "ultimopreciocombust") {
            return this.obtenerPrecioMasReciente(idcombust, fecha);

        }
        if(modo == "obtenultimokmt") {
            // console.log("modo:", modo, "idvehiculo:", idvehiculo);
            return this.getLatestKmtact(idvehiculo, fecha);
        }
  
    }

    async obtenerPrecioMasReciente(
       idcombust: number,
       fecha: string,
    ): Promise<any> {
      const precioMasReciente = await this.accesoriosService.obtenerValorMasReciente(
        idcombust,
        fecha,
      );
      return precioMasReciente;
    }

    async getLatestKmtact( idvehiculo: number, fecha: string): Promise<any> {
        return this.accesoriosService.findLatestKmtactByDateAndVehicleId(fecha, idvehiculo);
    }
}
