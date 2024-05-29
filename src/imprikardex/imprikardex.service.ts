import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThan, MoreThan, Raw, InsertValuesMissingError, Brackets } from 'typeorm';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;
import * as fs from 'fs';
import * as PdfPrinter from 'pdfmake';
import * as moment from 'moment-timezone';

import { MAX } from 'class-validator';
import { InvenService } from '../inven/inven.service';
import { AlmacenesService } from '../almacenes/almacenes.service';
import { Kardex, Exist, Series } from '../kardex/entities';
import { Inven } from '../inven/entities';
import { Cia } from '../cias/entities';
import { Almacenes } from '../almacenes/entities';
import { KardexService } from '../kardex/kardex.service';
import { CiaService } from  '../cias/cias.service';

@Injectable()
export class ImprikardexService {
    constructor (
        @InjectRepository(Kardex)
        private readonly kardexRepository: Repository<Kardex>,
        @InjectRepository(Inven)
        private readonly invenRepository: Repository<Inven>,
        @InjectRepository(Almacenes)
        private readonly almacenesRepository: Repository<Almacenes>,
        private invenService: InvenService,
        private almacenesSerivce : AlmacenesService,
        private kardexSerivce : KardexService,
        private ciasService: CiaService,

    ) {}


    async imprimir_kardex(idart: number, idalm: number, fechaini: string, fechafin: string, cia: number) {
        const prod = await this.invenService.getOne(cia, idart);
        const alm = await this.almacenesSerivce.getOne(cia, idalm);
        //const kardex = await this.kardexSerivce.getManyCia(cia, idalm, idart);
        const datoscia = await this.ciasService.getOne(cia);

        const kardex = await this.kardexSerivce.getManyCiaxFecha(cia, idalm, idart, fechaini, fechafin);
        let html = "";

        const logo = '<img src="images/logochico.png">';
        let fechayhora = moment().tz('America/Mexico_City').format();
        fechayhora = fechayhora.replace("T",":");
  
        const datospoliza = "Kardex de :" + prod.codigo + " " +  
          prod.descri + " Almacén:" + alm.clave + " "  + alm.nombre +
          " Del " + fechaini + " Al " + fechafin;
          html = "<html><body> " +  "<br>" + datospoliza;
          let encab = [
            'Fecha',
            'Documento',
            'Folio',
            'Serie',
            'Concepto',
            'Fecha Sale',
            'Concepto'
          ]
          html += '<table border="1"><tr>';
          for( let item of encab) {
            html += "<th>" + item + "</th>"
          }
          html += "</tr>";

        let body = [
          [
          'Fecha',
          'Documento',
          'Folio',
          'Serie',
          'Concepto',
          'Fecha Sale',
          'Concepto'
          ]
        ];
          
        for(let item of kardex) {
          const total = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(0)
          const preciou = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(0)
          let fechasale = "";
          let descrisale = "";
          if(item.salio == "S") {
            const mifecha = new Date(item.fechasale);
            fechasale = mifecha.toISOString().split('T')[0];
            descrisale = item.descrisale
          }
          const mifechaent = new Date(item.fecha)
          const fechamov = mifechaent.toISOString().split('T')[0];


          const renglon = [
            fechamov,
            item.docto.toString(),
            item.folio.toString(),
            item.serie,
            item.descri,
            fechasale,
            descrisale
          ];
          html += "<tr>";
            for (let col of renglon) {
                html += "<td>" + col + "</td>"
            }
            html += "</tr>";
            body.push(renglon);
        };
        html += "</table>";
        html += "</body></html>";
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
            { text: datoscia.razon, fontSize: 14, alignment: 'center'},
            { text: datoscia.direc, fontSize: 14, alignment: 'center'},
            { text: fechayhora + " " + datospoliza, fontSize: 9},
            
            {
              layout: 'lightHorizontalLines', // optional
              fontSize: 8,
              table: {
                widths: ['auto', 'auto','auto','auto','auto','auto','auto'],
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
        let file_name = "imprikardex_" + idart + "_" + Date.now() + ".pdf";
        let filename = dir + "/" + file_name;
        
        const pdfdoc = printer.createPdfKitDocument(documentDefinition);
        pdfdoc.pipe(fs.createWriteStream(filename));
        pdfdoc.end();

        let ruta = dir +  '/reporte.html'
        
        fs.writeFile(ruta, html, function (err) {
          if (err) throw err;
        });        
        //console.log("Poligas:", body);
        
        
        //const pdfdoc = pdfMake.createPdf(documentDefinition).download(file_name);
        //pdfdoc.pipe(fs.createWriteStream(file_name));
        //pdfdoc.end();
        return{'file_name': file_name};
        

      }


}
