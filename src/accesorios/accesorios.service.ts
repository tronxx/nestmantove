import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThan, MoreThan, Raw, InsertValuesMissingError, Brackets } from 'typeorm';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;
import * as fs from 'fs';
import * as PdfPrinter from 'pdfmake';
import * as moment from 'moment-timezone';

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

    async obtenerFechayHora(): Promise<any> {
      let fecha = moment().tz('America/Mexico_City').format();
      fecha = fecha.replace("T",":");
      return {
          fecha: fecha,
          fechayhora: fecha
      }

    }
  


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
          const total = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(item.total)
          const preciou = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(item.preciou)
          const renglon = [
              item.codigovehiculo + " " + item.nombrevehiculo,
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

            body.push(renglon);
        };
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
            const costo = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(item.costo)
            const renglon = [
              item.codigovehiculo + " " + item.nombrevehiculo,
              item.codigochofer,
              servicio,
              item.clavetaller + " " + item.nombretaller,
              item.kilom,
              costo,
              item.observ,
            ];
            totales.total += item.costo;

            body.push(renglon);
        };
        const costo = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(totales.total)

        const total = [
          'Totales',
          '',
          '',
          '',
          '',
          costo,
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

      async findtotalgasxperio(cia: number): Promise<any> {
        const today = new Date();
        const oneYearAgo = new Date();
        oneYearAgo.setFullYear(today.getFullYear() - 1);
        oneYearAgo.setDate(1);
        const stranuant = oneYearAgo.getFullYear().toString() + "-" + (oneYearAgo.getMonth() + 1).toString() + "-" + oneYearAgo.getDate().toString();
        const stranuhoy = today.getFullYear().toString() + "-" + (today.getMonth() + 1).toString() + "-" + today.getDate().toString();
        // console.log('stranuant:', stranuant, "stranuhoy:", stranuhoy);
        
        
        const obtentotales = await this.poligasRepository
          .createQueryBuilder('a')
          .select('year(a.fecha)', 'anu')
          .addSelect ('month(a.fecha)', 'mes')
          .addSelect('round(SUM(b.total),2)', 'total')
          .leftJoin(Renpogas, 'b', 'a.id = b.idpoligas')
          .where('a.fecha BETWEEN :startDate AND :endDate', {
            startDate: stranuant,
            endDate: stranuhoy,
          })
          .andWhere('a.cia =:cia', {cia})
          .groupBy('anu, mes')
          .getRawMany();
          return (obtentotales);
        //console.log("Registro Hallado:", latestRenpogas);
      }

      async findtotalservperio(cia: number): Promise<any> {
        const today = new Date();
        const oneYearAgo = new Date();
        oneYearAgo.setFullYear(today.getFullYear() - 1);
        oneYearAgo.setDate(1);
        const stranuant = oneYearAgo.getFullYear().toString() + "-" + (oneYearAgo.getMonth() + 1).toString() + "-" + oneYearAgo.getDate().toString();
        const stranuhoy = today.getFullYear().toString() + "-" + (today.getMonth() + 1).toString() + "-" + today.getDate().toString();
        // console.log('stranuant:', stranuant, "stranuhoy:", stranuhoy);
        
        
        const obtentotales = await this.poliservRepository
          .createQueryBuilder('a')
          .select('year(a.fecha)', 'anu')
          .addSelect ('month(a.fecha)', 'mes')
          .addSelect('round(SUM(b.costo),2)', 'total')
          .leftJoin(Renposerv, 'b', 'a.id = b.idpoliserv')
          .where('a.fecha BETWEEN :startDate AND :endDate', {
            startDate: stranuant,
            endDate: stranuhoy,
          })
          .andWhere('a.cia =:cia', {cia})
          .groupBy('anu, mes')
          .getRawMany();
          return (obtentotales);
        //console.log("Registro Hallado:", latestRenpogas);
      }

      resta_n_meses(fecha: Date, meses: number) {
        const nvafecha= fecha;
        let year = fecha.getFullYear();
        let  mes= fecha.getMonth();
        let  dia= fecha.getDate();
        while (meses ) {
          mes--;
          if(mes < 0) { year--; mes = 11 }
          meses--;
        }
        if(dia >28) {
          if(mes == 3 || mes == 5 || mes == 8 || mes == 10) {
            if(dia > 30) dia = 30;
          } else if(mes == 1) { 
              dia = 28
              if (year % 4) dia= 29 
          }
  
        }
        nvafecha.setFullYear(year);
        nvafecha.setDate(dia);
        nvafecha.setMonth(mes);
        return (nvafecha);
      }

      async findtotalservperioxvehi(cia: number): Promise<any> {
        const today = new Date();
        let oneYearAgo = new Date();
        oneYearAgo.setDate(1);
        oneYearAgo = this.resta_n_meses(oneYearAgo, 3);
        const stranuant = oneYearAgo.getFullYear().toString() + "-" + (oneYearAgo.getMonth() + 1).toString() + "-" + oneYearAgo.getDate().toString();
        const stranuhoy = today.getFullYear().toString() + "-" + (today.getMonth() + 1).toString() + "-" + today.getDate().toString();
        // console.log('stranuant:', stranuant, "stranuhoy:", stranuhoy);
        
        
        const obtentotales = await this.poliservRepository
          .createQueryBuilder('a')
          .select('year(a.fecha)', 'anu')
          .addSelect ('month(a.fecha)', 'mes')
          .addSelect ('c.codigo', 'vehi')
          .addSelect ('c.descri', 'descri')
          .addSelect('round(SUM(b.costo),2)', 'total')
          .leftJoin(Renposerv, 'b', 'a.id = b.idpoliserv')
          .leftJoin(Vehiculos, 'c', 'b.idvehiculo = c.id')
          .where('a.fecha BETWEEN :startDate AND :endDate', {
            startDate: stranuant,
            endDate: stranuhoy,
          })
          .andWhere('a.cia =:cia', {cia})
          .groupBy('anu, mes, vehi, descri')
          .getRawMany();
          return (obtentotales);
        //console.log("Registro Hallado:", latestRenpogas);
      }

      async findtotalgasxperioxvehi(cia: number): Promise<any> {
        const today = new Date();
        let oneYearAgo = new Date();
        oneYearAgo.setDate(1);
        oneYearAgo = this.resta_n_meses(oneYearAgo, 3);
        const stranuant = oneYearAgo.getFullYear().toString() + "-" + (oneYearAgo.getMonth() + 1).toString() + "-" + oneYearAgo.getDate().toString();
        const stranuhoy = today.getFullYear().toString() + "-" + (today.getMonth() + 1).toString() + "-" + today.getDate().toString();
        // console.log('stranuant:', stranuant, "stranuhoy:", stranuhoy);
        
        
        const obtentotales = await this.poligasRepository
          .createQueryBuilder('a')
          .select('year(a.fecha)', 'anu')
          .addSelect ('month(a.fecha)', 'mes')
          .addSelect ('c.codigo', 'vehi')
          .addSelect ('c.descri', 'descri')
          .addSelect('round(SUM(b.total),2)', 'total')
          .leftJoin(Renpogas, 'b', 'a.id = b.idpoligas')
          .leftJoin(Vehiculos, 'c', 'b.idvehiculo = c.id')
          .where('a.fecha BETWEEN :startDate AND :endDate', {
            startDate: stranuant,
            endDate: stranuhoy,
          })
          .andWhere('a.cia =:cia', {cia})
          .groupBy('anu, mes, vehi, descri')
          .getRawMany();
          return (obtentotales);
        //console.log("Registro Hallado:", latestRenpogas);
      }

      async findtotalgasxperioespecificoxvehi(cia: number, fechaini: string, fechafin: string): Promise<any> {
        const today = new Date();
        let oneYearAgo = new Date();
        oneYearAgo.setDate(1);
        oneYearAgo = this.resta_n_meses(oneYearAgo, 3);
        const stranuant = oneYearAgo.getFullYear().toString() + "-" + (oneYearAgo.getMonth() + 1).toString() + "-" + oneYearAgo.getDate().toString();
        const stranuhoy = today.getFullYear().toString() + "-" + (today.getMonth() + 1).toString() + "-" + today.getDate().toString();
        // console.log('stranuant:', stranuant, "stranuhoy:", stranuhoy);
        
        
        const obtentotales = await this.poligasRepository
          .createQueryBuilder('a')
          .select('a.fecha', 'fecha')
          .addSelect ('c.codigo', 'vehi')
          .addSelect ('c.descri', 'descri')
          .addSelect('round(SUM(b.total),2)', 'total')
          .addSelect('round(SUM(b.recorr),2)', 'recorre')
          .addSelect('round(SUM(b.litros),2)', 'litros')
          .leftJoin(Renpogas, 'b', 'a.id = b.idpoligas')
          .leftJoin(Vehiculos, 'c', 'b.idvehiculo = c.id')
          .where('a.fecha BETWEEN :startDate AND :endDate', {
            startDate: stranuant,
            endDate: stranuhoy,
          })
          .andWhere('a.cia = :cia', {cia})
          .groupBy('vehi, descri, fecha')
          .getRawMany();
          return (obtentotales);
        //console.log("Registro Hallado:", latestRenpogas);
      }

      async findtotalgasxperioespecificoxvehi2(
        cia: number, fechaini: string, fechafin: string, 
        vehiculoini:number, vehiculofin:number,
        ): Promise<any> {
        // console.log('stranuant:', stranuant, "stranuhoy:", stranuhoy);
        
        
        const obtentotales = await this.poligasRepository
          .createQueryBuilder('a')
          .select('b.idvehiculo')
          .addSelect ('c.codigo', 'vehi')
          .addSelect ('c.descri', 'descri')
          .addSelect('round(SUM(b.total),2)', 'total')
          .addSelect('round(SUM(b.recorr),2)', 'recorre')
          .addSelect('round(SUM(b.litros),2)', 'litros')
          .addSelect('min(b.kmtant)', 'kmtini')
          .addSelect('max(b.kmtact)', 'kmtfin')
          .leftJoin(Renpogas, 'b', 'a.id = b.idpoligas')
          .leftJoin(Vehiculos, 'c', 'b.idvehiculo = c.id')
          .where ('a.cia = :cia', {cia})
          .andWhere('a.fecha BETWEEN :startDate AND :endDate', {
            startDate: fechaini,
            endDate: fechafin,
          
          })
          .andWhere ('c.codigo between :vehiculoini and :vehiculofin', {
            vehiculoini: vehiculoini,
            vehiculofin: vehiculofin,
          })

          .groupBy('vehi, descri')
          .getRawMany();
          return (obtentotales);
        //console.log("Registro Hallado:", latestRenpogas);
      }

      async findtotalservxperioespecificoxvehi2(
        cia: number, fechaini: string, fechafin: string, 
        vehiculoini:number, vehiculofin:number,
        ): Promise<any> {
        // console.log('stranuant:', stranuant, "stranuhoy:", stranuhoy);
        
        
        const obtentotales = await this.poliservRepository
          .createQueryBuilder('a')
          .select('b.idvehiculo')
          .addSelect ('c.codigo', 'vehi')
          .addSelect ('c.descri', 'descri')
          .addSelect('round(SUM(b.costo),2)', 'costo')
          .leftJoin(Renposerv, 'b', 'a.id = b.idpoliserv')
          .leftJoin(Vehiculos, 'c', 'b.idvehiculo = c.id')
          .where ('a.cia = :cia', {cia})
          .andWhere('a.fecha BETWEEN :startDate AND :endDate', {
            startDate: fechaini,
            endDate: fechafin,
          
          })
          .andWhere ('c.codigo between :vehiculoini and :vehiculofin', {
            vehiculoini: vehiculoini,
            vehiculofin: vehiculofin,
          })

          .groupBy('vehi, descri')
          .getRawMany();
          return (obtentotales);
        //console.log("Registro Hallado:", latestRenpogas);
      }

      async obtenertotalXVehiculoxRangoFechas(
      cia: number, fechaini: string, fechafin: string, 
      vehiculoini:number, vehiculofin:number,
      ): Promise<any> { 
        const gastoxCombustiblexVehiculo = await this.findtotalgasxperioespecificoxvehi2(
          cia,
          fechaini,
          fechafin,
          vehiculoini,
          vehiculofin
        );
        const gastoxServxVehiculo = await this.findtotalservxperioespecificoxvehi2(
         cia,
         fechaini,
         fechafin,
         vehiculoini,
         vehiculofin
       );
       const resultados = {}
       for( const gasto of [...gastoxCombustiblexVehiculo, ...gastoxServxVehiculo]) {
         const b_idvehiculo = gasto.b_idvehiculo;
 
         if (!resultados[b_idvehiculo]) {
           resultados[b_idvehiculo] = { ...gasto, costosrv: 0 };
         } else {
           resultados[b_idvehiculo].costosrv = gasto.costo;
         }
       }
       const resultadoFinal = Object.values(resultados);
       return resultadoFinal;
 
      }

      async findConsumoCombustxperioespecificoxvehi(
        cia: number, fechaini: string, fechafin: string, 
        vehiculoini:number, vehiculofin:number,
        ): Promise<any> { 
          const consumo = this.renpongasService.getManyxVehixFecha(cia, vehiculoini, vehiculofin, fechaini, fechafin);
          return consumo;

      }

      async findGastosxServiciosxperioespecificoxvehi(
        cia: number, fechaini: string, fechafin: string, 
        vehiculoini:number, vehiculofin:number,
        ): Promise<any> { 
          
          const gastoxServxVehiculo = await this.renposervService.getManyxRenposervxFecha(
            cia,
            vehiculoini,
            vehiculofin,
            fechaini,
            fechafin,

          );
          return gastoxServxVehiculo;
      }

}
