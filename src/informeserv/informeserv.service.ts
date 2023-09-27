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
export class InformeservService {
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

    async imprimir_informe_servicios(numcia: number, vehiculoini: number, vehiculofin: number, fechaini: string, fechafin: string) {
        const gastocombust = await this.renposervService.getManyxRenposervxFecha(
           numcia, vehiculoini, vehiculofin, fechaini, fechafin
        );
        // console.log(gastocombust);
        
        //const renpogas = await this.renpongasService.getManyxRenpogas(0, idpoligas);
        let antveh =-1
        const cia = await this.ciasService.getOne(numcia);
        const datospoliza = "Informe de Gastos de Mantenimiento del:" + fechaini + " al " +  fechafin;
        let enctabla= [
          'Fecha',
          'Chofer',
          'Servicio',
          'Taller',
          'Kilometraje',
          'Importe',
          'Observaciones',
        ]

        let body = 
        [
          enctabla
        ];
        let totales = {
          total:0,

        }
        let totxvehi = {
          total:0,

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
          totxvehi.total=0
          let  datosmiveh = ""
          // tablaveh = [
          //   enctabla
          // ]
          let primero= true;

          for(let item of migasto) {
            const total = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(item.costo)
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
              ];
              tablaveh.push(renglon);

              primero = false
            }
            let servicio = item.claveserv + " " + item.descriserv;
            let taller = item.clavetaller + " " + item.nombretaller;
            if(item.toggle == "S") {
              if(item.edotoggle == "S" ) {
                servicio += " CON " + item.servop;
              } else {
                servicio += " SIN " + item.servop;
              }
  
            }
            const costo = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(item.costo)
 
            const renglon = [
              fecha,
              item.codigochofer,
              servicio,
              taller,
               item.kilom,
              costo,
              item.observ,
            ];
            totales.total += item.costo;
            totxvehi.total += item.costo;

            tablaveh.push(renglon);
  
          }

          const imptotal = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(totxvehi.total)
          const total = [
            '',
            '',
            'SubTotales',
            '',
            '',
            imptotal,
            '',
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
        const imptotal = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(totales.total)
       
        // tablaveh =[
        //   enctabla
        // ]
        const total = [
          '',
          '',
          'Total General',
          '',
          '',
          imptotal,
          '',
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
            widths: ['auto', 'auto','auto','auto','auto','auto','auto',],
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
        let file_name = "informe_srv_" + Date.now() + ".pdf";
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
