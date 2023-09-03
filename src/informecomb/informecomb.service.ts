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
export class InformecombService {

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

    async yimprimir_informe_combust(numcia: number, vehiculoini: number, vehiculofin: number, fechaini: string, fechafin: string) {
      const gastocombust = await this.renpongasService.getManyxVehixFecha(
         numcia, vehiculoini, vehiculofin, fechaini, fechafin
      );
      return gastocombust;
    }

    async xximprimir_informe_combust(numcia: number, vehiculoini: number, vehiculofin: number, fechaini: string, fechafin: string) {
        const gastocombust = await this.renpongasService.getManyxVehixFecha(
           numcia, vehiculoini, vehiculofin, fechaini, fechafin
        );
        //const renpogas = await this.renpongasService.getManyxRenpogas(0, idpoligas);
        let antveh =-1
        const cia = await this.ciasService.getOne(numcia);
        const datospoliza = "Informe de Gasolina del:" + fechaini + " al " +  fechafin;
        let enctabla= [
          'Fecha',
          'Chofer',
          'Zona',
          'Kmt.Ant',
          'Kmt.Act',
          'Recorrido',
          'Litros',
          'Precio.u',
          'Total',
          'Rendto',
        ]

        let body = 
        [
          enctabla
        ];
        let totales = {
          recorre: 0,
          litros: 0,
          total:0,
          rendto: 0

        }
        let totxvehi = {
          recorre: 0,
          litros: 0,
          total:0,
          rendto: 0

        }
          
        let tablaveh = []
        for(let item of gastocombust) {
          const total = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(item.total)
          const preciou = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(item.preciou)
          const month = String(item.fecha.getMonth() + 1).padStart(2, '0')
          const day = String(item.fecha.getDate()).padStart(2, '0')
          const anu = item.fecha.getFullYear().toString()
          const fecha = day + '/' + month + '/' + anu
          tablaveh = []

          if(antveh != item.codigovehiculo) {
            antveh = item.codigovehiculo
            const nombrevehiculo = item.nombrevehiculo
            const  subveh= [{text: 'Vehiculo:' + antveh.toString() + ' ' + nombrevehiculo, style: 'subheader' },
            {   text: ' ', margin: [0, 5] }]
            tablaveh = [
              subveh,
              enctabla
            ]

          }


          const renglon = [
              fecha,
              item.codigochofer,
              item.nombrezona,
              item.kmtant,
              item.kmtact,
              item.recorr,
              item.litros,
              preciou,
              total,
              Math.round(item.rendto *100) / 100
            ];
            totales.litros += Math.round(item.litros *100) / 100;
            totales.recorre += item.recorr;
            totales.total += item.total;
            totxvehi.litros += Math.round(item.litros *100) / 100;
            totxvehi.recorre += item.recorr;
            totxvehi.total += item.total;

            tablaveh.push(renglon);
        };
        body.push(tablaveh)
        if(totales.litros) {
          totales.rendto = totales.recorre / totales.litros;
        };
        const imptotal = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(totales.total)
        const totlitros = Math.round(totales.litros *100) / 100;
        const total = [
          'Totales',
          '',
          '',
          '',
          '',
          totales.recorre.toString(),
          totlitros.toString(),
          '',
          imptotal,
          (Math.round(totales.rendto *100) / 100).toString()
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
                widths: ['auto', 'auto','auto','auto','auto','auto','auto','auto','auto','auto'],
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
        let file_name = "informe_" + Date.now() + ".pdf";
        let filename = dir + "/" + file_name;
        
        const pdfdoc = printer.createPdfKitDocument(documentDefinition);
        pdfdoc.pipe(fs.createWriteStream(filename));
        pdfdoc.end();
        
        //console.log("Poligas:", body);
        
        
        //const pdfdoc = pdfMake.createPdf(documentDefinition).download(file_name);
        //pdfdoc.pipe(fs.createWriteStream(file_name));
        //pdfdoc.end();
        return{'file_name': file_name};
        

      }

      async ximprimir_informe_combust(numcia: number, vehiculoini: number, vehiculofin: number, fechaini: string, fechafin: string) {
        const data = await this.renpongasService.getManyxVehixFecha(
           numcia, vehiculoini, vehiculofin, fechaini, fechafin
        );
        //const data = require('./data.json'); // Carga los datos desde tu JSON

        const vehicles = {}; // Almacena los subtotales por vehículo
        const fonts = {
          Helvetica: {
            normal: 'Helvetica',
            bold: 'Helvetica-Bold',
            italics: 'Helvetica-Oblique',
            bolditalics: 'Helvetica-BoldOblique'
          }
        };
        const printer = new PdfPrinter(fonts);

    
        const docDefinition = {
          pageSize: 'LETTER',      
          pageOrientation: 'portrait',
          defaultStyle: {
            font: 'Helvetica'
          },
          anotherStyle: {
            alignment: 'right'
          },

          content: [],
        };
    
        data.forEach(entry => {
          if (!vehicles[entry.nombrevehiculo]) {
            vehicles[entry.nombrevehiculo] = { litros: 0, total: 0 };
          }
    
          vehicles[entry.nombrevehiculo].litros += entry.litros;
          vehicles[entry.nombrevehiculo].total += entry.total;
    
          docDefinition.content.push(
            { text: `Vehículo: ${entry.nombrevehiculo}`, style: 'header' },
            [
              'Fecha',
              'Chofer',
              'Zona',
              'Kmt.Ant',
              'Kmt.Act',
              'Recorrido',
              'Litros',
              'Precio U',
              'Total',
              'Rendto',
            ],
            [
              entry.fecha,
              entry.codigochofer,
              entry.nombrezona,
              entry.kmtant,
              entry.kmtact,
              entry.recorr,
              entry.litros,
              entry.preciou,
              entry.total,
              entry.rendto,
            ],
            { text: ' ', margin: [0, 10] } // Espacio entre registros
          );
        });
    
        docDefinition.content.push(
          { text: 'Totales por Vehículo:', style: 'subheader' },
          { text: ' ', margin: [0, 5] } // Espacio
        );
    
        // Agrega los subtotales por vehículo al PDF
        for (const vehicle in vehicles) {
          docDefinition.content.push(
            [
              vehicle,
              '',
              '',
              '',
              '',
              '',
              vehicles[vehicle].litros,
              '',
              vehicles[vehicle].total,
              '',
            ],
            { text: ' ', margin: [0, 5] } // Espacio
          );
        }
    
        // Agrega el total general al PDF
        const totalLitros =0;
        //const totalLitros = Object.values(vehicles).reduce(
        //  (acc, curr) => acc + curr.litros,
        //  0
        //);
        const totalTotal = 0;
        // const totalTotal = Object.values(vehicles).reduce(
        //   (acc, curr) => acc + curr.total,
        //   0
        // );
        docDefinition.content.push(
          { text: 'Total General:', style: 'subheader' },
          [
            '',
            '',
            '',
            '',
            '',
            '',
            totalLitros,
            '',
            totalTotal,
            '',
          ]
        );
    
        const options = {
        }
        const pdfDoc = printer.createPdfKitDocument(docDefinition, options);
  
        //const pdfDoc = pdfMake.createPdf(docDefinition);
        var dir = './upload';
        if (!fs.existsSync(dir)){
          fs.mkdirSync(dir);
        }
        let file_name = "informe_" + Date.now() + ".pdf";
        let filename = dir + "/" + file_name;

        pdfDoc.pipe(fs.createWriteStream(filename));
        pdfDoc.end();
        return{'file_name': file_name};
    
      }

      async imprimir_informe_combust(numcia: number, vehiculoini: number, vehiculofin: number, fechaini: string, fechafin: string) {
        const gastocombust = await this.renpongasService.getManyxVehixFecha(
           numcia, vehiculoini, vehiculofin, fechaini, fechafin
        );
        //const renpogas = await this.renpongasService.getManyxRenpogas(0, idpoligas);
        let antveh =-1
        const cia = await this.ciasService.getOne(numcia);
        const datospoliza = "Informe de Gasolina del:" + fechaini + " al " +  fechafin;
        let enctabla= [
          'Fecha',
          'Chofer',
          'Zona',
          'Kmt.Ant',
          'Kmt.Act',
          'Recorrido',
          'Litros',
          'Precio.u',
          'Total',
          'Rendto',
        ]

        let body = 
        [
          enctabla
        ];
        let totales = {
          recorre: 0,
          litros: 0,
          total:0,
          rendto: 0

        }
        let totxvehi = {
          recorre: 0,
          litros: 0,
          total:0,
          rendto: 0

        }
          
        let tablasveh = []
        let mitablaveh= {}
        let nombrevehiculo = ""
        let datosmiveh = ""
        let tablaveh = [
          enctabla
        ]
        let vehiculos = []
        for(let item of gastocombust) {
          const codigo = item.codigovehiculo
          const found = vehiculos.find((element) => element == codigo)
          if(!found) {
            vehiculos.push(codigo)
          }
        }
        //console.log("Vehiculos", vehiculos);
        for(let miveh of vehiculos) {
          let migasto = gastocombust.filter(mi => mi.codigovehiculo === miveh)
          totxvehi.litros=0
          totxvehi.recorre=0
          totxvehi.rendto=0
          totxvehi.total=0
          let  datosmiveh = ""
          // tablaveh = [
          //   enctabla
          // ]
          let primero= true;

          for(let item of migasto) {
            const total = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(item.total)
            const preciou = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(item.preciou)
            const month = String(item.fecha.getMonth() + 1).padStart(2, '0')
            const day = String(item.fecha.getDate()).padStart(2, '0')
            const anu = item.fecha.getFullYear().toString()
            const fecha = day + '/' + month + '/' + anu
            nombrevehiculo = item.nombrevehiculo
            datosmiveh = nombrevehiculo
            if(primero) {
              const renglon = [
                "",
                miveh.toString(),
                datosmiveh,
                "",
                "",
                "",
                "",
                "",
                "",
                "",
              ];
              tablaveh.push(renglon);

              primero = false
            }
            const renglon = [
              fecha,
              item.codigochofer,
              item.nombrezona,
              item.kmtant,
              item.kmtact,
              item.recorr,
              item.litros,
              preciou,
              total,
              Math.round(item.rendto *100) / 100
            ];
            totales.litros += Math.round(item.litros *100) / 100;
            totales.recorre += item.recorr;
            totales.total += item.total;
            totxvehi.litros += Math.round(item.litros *100) / 100;
            totxvehi.recorre += item.recorr;
            totxvehi.total += item.total;

            tablaveh.push(renglon);
  
          }

          if(totxvehi.litros) {
            totxvehi.rendto = totxvehi.recorre / totxvehi.litros;
          };
          const imptotal = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(totxvehi.total)
          const totlitros = Math.round(totxvehi.litros *100) / 100;
          const total = [
            '',
            '',
            'SubTotales',
            '',
            '',
            totxvehi.recorre.toString(),
            totlitros.toString(),
            '',
            imptotal,
            (Math.round(totxvehi.rendto *100) / 100).toString()
          ];
          tablaveh.push(total);
          
          
          // mitablaveh={ text: datosmiveh, fontSize: 10}
          // tablasveh.push(mitablaveh)
          // mitablaveh = 
          // {
          //   layout: 'lightHorizontalLines', // optional
          //   fontSize: 8,
          //   table: {
          //     widths: ['auto', 'auto','auto','auto','auto','auto','auto','auto','auto','auto'],
          //     headerRows: 1,
          //     body: tablaveh
          //   },
          // }
          // tablasveh.push(mitablaveh)
          // mitablaveh={ text:".", fontSize: 10}
          // tablasveh.push(mitablaveh)
            
        }
        // ->Ahora Agrego la tabla General
        if(totales.litros) {
          totales.rendto = totales.recorre / totales.litros;
        };
        const imptotal = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(totales.total)
        const totlitros = Math.round(totales.litros *100) / 100;
        // tablaveh =[
        //   enctabla
        // ]
        const total = [
          '',
          '',
          'Total General',
          '',
          '',
          totales.recorre.toString(),
          totlitros.toString(),
          '',
          imptotal,
          (Math.round(totales.rendto *100) / 100).toString()
        ];
        tablaveh.push(total);
        // console.log("Debug tablaveh:", tablaveh);
        mitablaveh={ text: datosmiveh, fontSize: 10}
        tablasveh.push(mitablaveh)
        mitablaveh = 
        {
          layout: 'lightHorizontalLines', // optional
          fontSize: 8,
          table: {
            widths: ['auto', 'auto','auto','auto','auto','auto','auto','auto','auto','auto'],
            headerRows: 1,
            body: tablaveh
          },
        }
        tablasveh.push(mitablaveh)

        
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
          header: { text: '\n' +  cia.razon + '\n' + cia.direc + '\n' , alignment: 'center'},
          content: [
            { text:  datospoliza, alignment: 'center'},
            tablasveh,
          ]

        }

        var dir = './upload';
        if (!fs.existsSync(dir)){
          fs.mkdirSync(dir);
        }
        let file_name = "informe_" + Date.now() + ".pdf";
        let filename = dir + "/" + file_name;
        
        const pdfdoc = printer.createPdfKitDocument(documentDefinition);
        pdfdoc.pipe(fs.createWriteStream(filename));
        pdfdoc.end();
        
        //console.log("Poligas:", body);
        
        
        //const pdfdoc = pdfMake.createPdf(documentDefinition).download(file_name);
        //pdfdoc.pipe(fs.createWriteStream(file_name));
        //pdfdoc.end();
        return{'file_name': file_name};
        

      }

      
}
