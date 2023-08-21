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

import { of } from 'rxjs';


@Injectable()
export class AccesoriosService {

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
    )
    {}

    async obtenerValorMasReciente(idcombust: number, fecha: string): Promise<any> {
        // Obtener el valor más reciente de prelit para el idcombust y la fecha dada
        const precios = await this.PrecioscombRepository.find({
          where: {
            idcombust: idcombust,
            fecha: LessThan(fecha), // Menor o igual a la fecha dada
          },
          order: {
            fecha: 'DESC', // Ordenar por fecha de manera descendente (el más reciente primero)
          },
          take: 1, // Obtener solo el primer resultado (el más reciente)
        });
        return precios;
    
        // if (precios && precios.length > 0) {
        //   return precios[0].prelit;
        // } else {
        //   return 0; // Si no se encuentra un valor, devolver 0 o el valor que consideres apropiado
        // }
      }
    
      async findLatestKmtactByDateAndVehicleId(fecha: string, idvehiculo: number): Promise<any> {
        let latestRenpogas = await this.RenpogasRepository
          .createQueryBuilder('renpogas')
          .select('renpogas.kmtact', 'kmtact')
          .where('renpogas.idvehiculo = :idvehiculo', { idvehiculo })
          .andWhere('renpogas.fecnot <= :fecha', { fecha })
          .orderBy('renpogas.fecnot', 'DESC')
          .limit(1)
          .getRawOne();
        //console.log("Registro Hallado:", latestRenpogas);
        if(!latestRenpogas) {
          latestRenpogas = { kmtact: 0}
        }
        return latestRenpogas;
      }

      async imprimir_poliza(idpoligas: number) {
        const poliza = await this.poligasService.getOne(0, idpoligas);
        const renpogas = await this.renpongasService.getManyxRenpogas(0, idpoligas);
        const numcia = poliza.cia;
        const cia = await this.ciasService.getOne(numcia);
        let  fechapol = String(poliza.fecha.getDate()).padStart(2, '0');
        fechapol += "/" + String(poliza.fecha.getMonth() + 1).padStart(2, '0');
        fechapol += "/" + poliza.fecha.getFullYear();
        const datospoliza = "Póliza de Gasolina:" + poliza.clave + " " +  
          poliza.nombre + " Del " + fechapol;
        let body = 
        [
          [
            'Vehiculo',
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
        ];
        let totales = {
          recorre: 0,
          litros: 0,
          total:0,
          rendto: 0

        }
          
        for(let item of renpogas) {
            const renglon = [
              item.codigovehiculo + " " + item.nombrevehiculo,
              item.codigochofer,
              item.nombrezona,
              item.kmtant,
              item.kmtact,
              item.recorr,
              item.litros,
              item.preciou,
              item.total,
              Math.round(item.rendto *100) / 100
            ];
            totales.litros += item.litros;
            totales.recorre += item.recorr;
            totales.total += item.total;

            body.push(renglon);
        };
        if(totales.litros) {
          totales.rendto = totales.recorre / totales.litros;
        };
        const total = [
          'Totales',
          '',
          '',
          '',
          '',
          totales.recorre.toString(),
          totales.litros.toString(),
          '',
          totales.total.toString(),
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
        let file_name = "poligas_" +idpoligas + Date.now() + ".pdf";
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

      async imprimir_poliza_servicio(idpoliserv: number) {
        const poliza = await this.poliservService.getOne(0, idpoliserv);
        const renpogas = await this.renposervService.getManyxRenpogas(0, idpoliserv);
        const numcia = poliza.cia;
        const cia = await this.ciasService.getOne(numcia);
        let  fechapol = String(poliza.fecha.getDate()).padStart(2, '0');
        fechapol += "/" + String(poliza.fecha.getMonth() + 1).padStart(2, '0');
        fechapol += "/" + poliza.fecha.getFullYear();
        const datospoliza = "Póliza de Servicios:" + poliza.clave + " " +  
          poliza.nombre + " Del " + fechapol;
        let body = 
        [
          [
            'Vehiculo',
            'Chofer',
            'Servicio',
            'Taller',
            'Kilometraje',
            'Total',
            'Observaciones',
          ]
        ];
        let totales = {
          total:0,
        }
          
        for(let item of renpogas) {
            let servicio = item.claveserv + " " + item.descriserv;
            if(item.toggle == "S") {
              if(item.edotoggle == "S" ) {
                servicio += " CON " + item.servop;
              } else {
                servicio += " SIN " + item.servop;
              }
  
            }
            const renglon = [
              item.codigovehiculo + " " + item.nombrevehiculo,
              item.codigochofer,
              servicio,
              item.clavetaller + " " + item.nombretaller,
              item.kilom,
              item.costo,
              item.observ,
            ];
            totales.total += item.costo;

            body.push(renglon);
        };
        const total = [
          'Totales',
          '',
          '',
          '',
          '',
          totales.total.toString(),
          '',
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
                widths: ['auto', 'auto','auto','auto','auto','auto','auto',],
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
        let file_name = "poliserv_" +idpoliserv + Date.now() + ".pdf";
        
        const pdfdoc = printer.createPdfKitDocument(documentDefinition);
        pdfdoc.pipe(fs.createWriteStream(dir + "/"+ file_name));
        pdfdoc.end();
        
        //console.log("Poligas:", body);
        
        
        //const pdfdoc = pdfMake.createPdf(documentDefinition).download(file_name);
        //pdfdoc.pipe(fs.createWriteStream(file_name));
        //pdfdoc.end();
        return{'file_name': file_name};
        

      }

}
