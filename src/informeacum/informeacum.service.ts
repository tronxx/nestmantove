import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThan, MoreThan, Raw, InsertValuesMissingError } from 'typeorm';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;
import * as fs from 'fs';
import * as PdfPrinter from 'pdfmake';

import { MAX } from 'class-validator';
import { Precioscomb } from '../precioscomb/entities';
import { Renpogas } from '../renpogas/entities';
import { Poligas } from '../poligas/entities';
import { Combust } from '../combust/entities';
import { Cia } from '../cias/entities';
import { Vehiculos } from '../vehiculos/entities';
import { Poliserv } from 'src/poliserv/entities';
import { Renposerv } from 'src/renposerv/entities';
import { ServMantos } from 'src/servmantos/entities';
import { Talleres } from '../talleres/entities';
import { RenpogasService } from '../renpogas/renpogas.service';
import { PoligasService } from '../poligas/poligas.service';
import { CiaService } from '../cias/cias.service';
import { PoliservService } from '../poliserv/poliserv.service';
import { RenposervService } from '../renposerv/renposerv.service';
import { AccesoriosService } from '../accesorios/accesorios.service';
import { of } from 'rxjs';

@Injectable()
export class InformeacumService {
    constructor (
        @InjectRepository(Precioscomb)
        private readonly PrecioscombRepository: Repository<Precioscomb>,
        @InjectRepository(Renpogas)
        private readonly RenpogasRepository: Repository<Renpogas>,
        @InjectRepository(Poligas)
        private readonly poligasRepository: Repository<Poligas>,
        @InjectRepository(Vehiculos)
        private readonly vehicuosRepository: Repository<Vehiculos>,
        @InjectRepository(Cia)
        private readonly ciaRepositoyy: Repository <Cia>,
        @InjectRepository(Renposerv)
        private readonly renposervRepository: Repository <Renposerv>,
        @InjectRepository(ServMantos)
        private readonly servmantosRepository: Repository <ServMantos>,
        @InjectRepository(Talleres)
        private readonly talleresRepository: Repository <Talleres>,
        @InjectRepository(Poliserv)
        private readonly poliservRepository: Repository <Poliserv>,
        private renpongasService: RenpogasService,
        private poligasService : PoligasService,
        private ciasService: CiaService,
        private poliservService: PoliservService,
        private renposervService: RenposervService,
        private accesoriosService: AccesoriosService,
    )
    {}

    async imprimir_informe_acum(numcia: number, vehiculoini: number, vehiculofin: number, fechaini: string, fechafin: string) {
        const gastocombust = await this.accesoriosService.obtenertotalXVehiculoxRangoFechas(
           numcia, fechaini, fechafin, vehiculoini, vehiculofin
        );
        //console.log(gastocombust);
        
        const cia = await this.ciasService.getOne(numcia);
        const datospoliza = "Informe de Gastos  del:" + fechaini + " al " +  fechafin;
        let enctabla= [
          'Vehiculo',
          'Km.Inicial',
          'Km.Final',
          'Recorrido',
          'Litros',
          'Rendimiento',
          'Total.Combust',
          'Total.Servicios',
          'Total General',
        ];

      let body = 
      [
        enctabla
      ];
      let totales = {
        recorre:0,
        totcomb:0,
        totsrv:0,
        total:0,
        litros:0,
      }
        
      for(let item of gastocombust) {
          const costo = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(item.total + item.costosrv)
          const costocomb = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(item.total)
          const costoserv = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(item.costosrv)
          const rendto = Math.round(item.recorre / item.litros * 100) / 100;
          const litros = Math.round(item.litros * 100) / 100;
          const recorre = Number( item.recorre);
          const renglon = [
            item.vehi + " " + item.descri,
            item.kmtini,
            item.kmtfin,
            item.recorre,
            litros.toString(),
            rendto.toString(),
            costocomb,
            costoserv,
            costo
          ];
          totales.recorre += recorre;
          totales.totcomb += item.total;
          totales.totsrv += item.costosrv;
          totales.litros += litros;
          totales.total += item.total +item.costosrv;

          body.push(renglon);
      };
      const costo = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(totales.total)
      const costocomb = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(totales.totcomb)
      const costoserv = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(totales.totsrv)

      const total = [
        'Totales',
        '',
        '',
        Math.round(totales.recorre).toString(),
        Math.round(totales.litros).toString(),
        '',
        costocomb,
        costoserv,
        costo,
      ];
      body.push(total);
         
      
      //body.push(misdatos);
      const fonts = {
        Helvetica: {
          normal: 'Helvetica',
          bold: 'Helvetica-Bold',
          italics: 'Helvetica-Oblique',
          bolditalics: 'Helvetica-BoldOblique'
        }
      };
      const printer = new PdfPrinter(fonts);
   
      const documentDefinition = {
        pageSize: 'LETTER',      
        pageOrientation: 'portrait',
        defaultStyle: {
          font: 'Helvetica'
        },
        anotherStyle: {
          alignment: 'right'
        },
        content: [
          { text: cia.razon, fontSize: 14, alignment: 'center'},
          { text: cia.direc, fontSize: 14, alignment: 'center'},
          { text: datospoliza, fontSize: 10},
          
          {
            layout: 'lightHorizontalLines', // optional
            fontSize: 8,
            table: {
              widths: ['auto', 'auto','auto','auto','auto','auto','auto','auto','auto',],
              headerRows: 1,
              body: body
            },
          }
        ]

      };


        var dir = './upload';
        if (!fs.existsSync(dir)){
          fs.mkdirSync(dir);
        }
        let file_name = "informe_srv_" + Date.now() + ".pdf";
        let filename = dir + "/" + file_name;
        
          
        const pdfdoc = printer.createPdfKitDocument(documentDefinition);
        pdfdoc.pipe(fs.createWriteStream(filename));
        pdfdoc.end();
        return{'file_name': file_name};
        

      }

}
