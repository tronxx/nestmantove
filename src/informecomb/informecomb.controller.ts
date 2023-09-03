import { Body, Controller, Delete, Get, Param, Post, Put, Query, Res } from '@nestjs/common';
import { Request } from 'express';

import { ApiTags } from '@nestjs/swagger';
import { stringify } from 'querystring';
import { InformecombService } from './informecomb.service';
import { Response } from 'express'; // Import the Response object
import path = require('path');
import { Observable, of } from 'rxjs';
import { join } from 'path';

@ApiTags('informecomb')
@Controller('informecomb')

export class InformecombController {
    constructor (private readonly informecombService: InformecombService) {}
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
        @Query('vehiculoini') vehiculoini: number,
        @Query('vehiculofin') vehiculofin: number,
        @Query('cia') cia: number,
        

    ): Promise<any> {
        // console.log("modo:", modo);
        
        if(modo == "informecombust") {
            return this.informe_gas_x_vehi(cia, vehiculoini, vehiculofin, fechaini, fechafin);

        }
    }

    async informe_gas_x_vehi(cia: number, vehiculoini: number, vehiculofin: number, fechaini: string, fechafin: string) {
        return await this.informecombService.imprimir_informe_combust(cia, vehiculoini, vehiculofin, fechaini, fechafin);
    }

}
