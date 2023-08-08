import { Body, Controller, Delete, Get, Param, Post, Put, Query, Res } from '@nestjs/common';
import { Request } from 'express';

import { ApiTags } from '@nestjs/swagger';
import { stringify } from 'querystring';
import { AccesoriosService } from './accesorios.service'
import { Response } from 'express'; // Import the Response object
import path = require('path');
import { Observable, of } from 'rxjs';
import { join } from 'path';

@ApiTags('accesorios')
@Controller('accesorios')
export class AccesoriosController {

    constructor (private readonly accesoriosService: AccesoriosService) {}

    @Get()
    async definiendo (
        @Query('modo') modo: string,
        @Query('idcombust') idcombust: number,
        @Query('idvehiculo') idvehiculo: number,
        @Query('idpoligas') idpoligas: number,
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
        if(modo == "imprimirpoligas") {
            return this.imprimir_poligas(idpoligas);
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

    async imprimir_poligas(idpoligas: number): Promise <any> {
        //console.log("Voy a imprimir la poliza de gasolina", idpoligas);
        
        const mipdf = await ( this.accesoriosService.imprimir_poliza(idpoligas));
        return (mipdf);
    }


    @Get(':filename')
    downloadFile(@Param('filename') filename, @Res() res ): Observable<Object> {
    return of(res.sendFile(join(process.cwd(), './'+filename)));
  }
}
