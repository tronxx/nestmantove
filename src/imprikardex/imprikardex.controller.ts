import { Body, Controller, Delete, Get, Param, Post, Put, Query, Res } from '@nestjs/common';
import { Request } from 'express';

import { ApiTags } from '@nestjs/swagger';
import { stringify } from 'querystring';
import { InvenService } from '../inven/inven.service';
import { ImprikardexService } from './imprikardex.service';
import { Response } from 'express'; // Import the Response object
import path = require('path');
import { Observable, of } from 'rxjs';
import { join } from 'path';
import { Vehiculos } from 'src/vehiculos/entities';


@ApiTags('imprikardex')
@Controller('imprikardex')
export class ImprikardexController {

    params :
    {
        idprod:number, 
        idalm:number, 
        fechaini:string, 
        fechafin:string, 
        cia:number
    }

    constructor (private readonly imprikardexservice: ImprikardexService) {}

    @Get()
    async definiendo (
        @Query('modo') modo: string,
        @Query('idart') idart: number,
        @Query('idalm') idalm: number,
        @Query('fechaini') fechaini: string,
        @Query('fechafin') fechafin: string,
        @Query('cia') cia: number,

    ): Promise<any> {
        // console.log("modo:", modo);
        if(modo == "impresionKardex") {
            return  this.impresionKardex({idart, idalm, fechaini, fechafin, cia}) 

        }


    }

    async impresionKardex({idart, idalm, fechaini, fechafin, cia }) {
                
        const mipdf = await this.imprikardexservice.imprimir_kardex(idart, idalm, fechaini, fechafin, cia)
        return (mipdf);
    }

    @Get(':filename')
    downloadFile(@Param('filename') filename, @Res() res ): Observable<Object> {
        return of(res.sendFile(join(process.cwd(), './upload/'+filename)));
        //return of(res.sendFile(filename));

    }


}
