import { Body, Controller, Delete, Get, Param, Post, Put, Query, Res } from '@nestjs/common';
import { Request } from 'express';

import { ApiTags } from '@nestjs/swagger';
import { stringify } from 'querystring';
import { AccesoriosService } from '../accesorios/accesorios.service';
import { InformeacumService } from './informeacum.service';
import { Response } from 'express'; // Import the Response object
import path = require('path');
import { Observable, of } from 'rxjs';
import { join } from 'path';

@ApiTags('informeacum')
@Controller('informeacum')
export class InformeacumController {
    constructor (
        private readonly accesoriosService: AccesoriosService,
        private readonly informeacumService: InformeacumService

        ) {}
    @Get()
    async definiendo (
        @Query('modo') modo: string,
        @Query('fechaini') fechaini: string,
        @Query('fechafin') fechafin: string,
        @Query('vehiculoini') vehiculoini: number,
        @Query('vehiculofin') vehiculofin: number,
        @Query('cia') cia: number,
        

    ): Promise<any> {
        // console.log("modo:", modo);
        
        if(modo == "informeacum") {
            //const datos = this.accesoriosService.obtenertotalXVehiculoxRangoFechas(cia, fechaini, fechafin, vehiculoini, vehiculofin);
            //return datos;

            return this.informe_srv_x_vehi(cia, vehiculoini, vehiculofin, fechaini, fechafin);

        }
    }

    informe_srv_x_vehi(cia, vehiculoini, vehiculofin, fechaini, fechafin) {
        return this.informeacumService.imprimir_informe_acum(cia, vehiculoini, vehiculofin,
            fechaini, fechafin
        )
        
    }

}
