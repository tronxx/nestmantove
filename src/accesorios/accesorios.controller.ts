import { Body, Controller, Delete, Get, Param, Post, Put, Query, Res } from '@nestjs/common';
import { Request } from 'express';

import { ApiTags } from '@nestjs/swagger';
import { stringify } from 'querystring';
import { AccesoriosService } from './accesorios.service'
import { Response } from 'express'; // Import the Response object
import path = require('path');
import { Observable, of } from 'rxjs';
import { join } from 'path';
import { Vehiculos } from 'src/vehiculos/entities';
import * as moment from 'moment-timezone';

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
        @Query('idpoliserv') idpoliserv: number,
        @Query('fecha') fecha: string,
        @Query('fechaini') fechaini: string,
        @Query('fechafin') fechafin: string,
        @Query('cia') cia: number,
        @Query('vehiculoini') vehiculoini: number,
        @Query('vehiculofin') vehiculofin: number,
        

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
        if(modo == "imprimirpoliserv") {
            return this.imprimir_poliserv (idpoliserv);
        }
        if(modo == "obtenertotalesgasxperio") {
            return this.obtenertotalesgas(cia);
        }
        if(modo == "obtenertotalesservxperio") {
            return this.obtenertotalesserv(cia);
        }
        if(modo == "obtenertotalesservxperioxvehi") {
            return this.obtenertotalesservxvehi(cia);
        }
        if(modo == "obtenertotalesgasxperioxvehi") {
            return this.obtenertotalesgasxvehi(cia);
        }
        if(modo == "obtenertotalesgasxperioxvehiculo") {
            return this.obtenerGastosXVehiculoxRangoFechas(
                cia, fechaini, fechafin, vehiculoini, vehiculofin);
        }
        if(modo == "obtenertotalesxperioxvehiculo") {
            return this.obtenertotalXVehiculoxRangoFechas(
                cia, fechaini, fechafin, vehiculoini, vehiculofin);
        }
        if(modo == "obtenerGastosCombustXVehiculoxRangoFechas") {
            return this.obtenerGastosCombustXVehiculoxRangoFechas(
                cia, fechaini, fechafin, vehiculoini, vehiculofin);
        }
        if(modo == "obtenerGastosServiciostXVehiculoxRangoFechas") {
            return this.obtenerGastosServiciostXVehiculoxRangoFechas (
                cia, fechaini, fechafin, vehiculoini, vehiculofin);
        }
        if(modo == "obtenerFechayHora") {
            return this.obtenerFechayHora ();
        }
  
  
    }

    async obtenerFechayHora() {
        return await this.accesoriosService.obtenerFechayHora();
    }


    async obtenertotalesgas(cia:number) {
        return await this.accesoriosService.findtotalgasxperio(cia);
    }

    async obtenertotalesserv(cia:number) {
        return await this.accesoriosService.findtotalservperio(cia);
    }

    async obtenertotalesservxvehi(cia:number) {
        return await this.accesoriosService.findtotalservperioxvehi(cia);
    }

    async obtenertotalesgasxvehi(cia:number) {
        return await this.accesoriosService.findtotalgasxperioxvehi(cia);
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

    async obtenerGastosXVehiculoxRangoFechas(
        cia: number,
        fechaini: string,
        fechafin: string,
        vehiculoini: number,
        vehiculofin: number,
     ): Promise<any> {
     const gastoxCombustiblexVehiculo = await this.accesoriosService.findtotalgasxperioespecificoxvehi2(
         cia,
         fechaini,
         fechafin,
         vehiculoini,
         vehiculofin
       );
       return gastoxCombustiblexVehiculo;
    }

    async obtenertotalXVehiculoxRangoFechas(
        cia: number,
        fechaini: string,
        fechafin: string,
        vehiculoini: number,
        vehiculofin: number,
     ): Promise<any> {
     const gastoxVehiculo = await this.accesoriosService.obtenertotalXVehiculoxRangoFechas(
         cia,
         fechaini,
         fechafin,
         vehiculoini,
         vehiculofin
       );
      return gastoxVehiculo;
    }

 
    async getLatestKmtact( idvehiculo: number, fecha: string): Promise<any> {
        return this.accesoriosService.findLatestKmtactByDateAndVehicleId(fecha, idvehiculo);
    }

    async imprimir_poligas(idpoligas: number): Promise <any> {
        //console.log("Voy a imprimir la poliza de gasolina", idpoligas);
        
        const mipdf = await ( this.accesoriosService.imprimir_poliza(idpoligas));
        return (mipdf);
    }

    async imprimir_poliserv(idpoliserv: number): Promise <any> {
        //console.log("Voy a imprimir la poliza de gasolina", idpoligas);
        
        const mipdf = await ( this.accesoriosService.imprimir_poliza_servicio(idpoliserv));
        return (mipdf);
    }

    async obtenerGastosCombustXVehiculoxRangoFechas(
        cia: number,
        fechaini: string,
        fechafin: string,
        vehiculoini: number,
        vehiculofin: number,
     ): Promise<any> { 
        const gastoconmbus = this.accesoriosService.findConsumoCombustxperioespecificoxvehi(
            cia, fechaini, fechafin, 
            vehiculoini, vehiculofin);
        return gastoconmbus;
    }

    async obtenerGastosServiciostXVehiculoxRangoFechas(
        cia: number,
        fechaini: string,
        fechafin: string,
        vehiculoini: number,
        vehiculofin: number,
     ): Promise<any> { 
        const gastoconmbus = this.accesoriosService.findGastosxServiciosxperioespecificoxvehi(
            cia, fechaini, fechafin, 
            vehiculoini, vehiculofin);
        return gastoconmbus;
    }


    @Get(':filename')
    downloadFile(@Param('filename') filename, @Res() res ): Observable<Object> {
        return of(res.sendFile(join(process.cwd(), './upload/'+filename)));
        //return of(res.sendFile(filename));

    }
}
