import { Marcasveh } from 'src/marcasveh/entities';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
    OneToOne,
    JoinColumn,
    UpdateDateColumn,
    PrimaryColumn
  } from 'typeorm';

@Entity('vehiculos')

export class Vehiculos {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'integer'})
    codigo: number;

    @Column({type: 'varchar', length:100, nullable: false})
    descri: string;

    @Column({type: 'integer'})
    idmarcaveh: number;

    @Column({type: 'integer'})
    modelo: number;

    @Column({type: 'date'})
    fecing: Date;
    
    @Column({type: 'date'})
    fecamtac: Date;
    
    @Column({type: 'varchar', length:10, nullable: false})
    placas: string;

    @Column({type: 'varchar', length:30, nullable: false})
    chasis: string;

    @Column({type: 'varchar', length:30, nullable: false})
    sermot: string;

    @Column({type: 'integer'})
    maxtac: number;

    @Column({type: 'integer'})
    kilom: number;

    @Column({type: 'integer'})
    tacacu: number;

    @Column({type: 'integer'})
    nvohasta: number;

    @Column({type: 'varchar', length:1, nullable:false})
    nvousa: string;

    @Column({type: 'integer'})
    idtipogas: number;

    @Column({type: 'varchar', length:20, nullable:false})
    caractm: string;

    @Column({type: 'varchar', length:20, nullable:false})
    tipollanta: string;

    @Column({type: 'varchar', length:20, nullable:false})
    bateria: string;

    @Column({type: 'varchar', length:20, nullable:false})
    polseg: string;

    @Column({type: 'date'})
    venpol: Date;
    
    @Column({type: 'integer'})
    cia: number;

    @Column({type: 'integer'})
    idchofer: number;

    @Column({type: 'varchar', length:1, nullable:false})
    camtac: string;

    @Column({type: 'integer'})
    kmtcamtac: number;

    @Column({type: 'integer'})
    idzona: number;

    @Column({type: 'varchar', length:1})
    moto: string;

    @Column({type: 'varchar', length:1})
    status: string;

    @Column({type: 'date'})
    fecbaj: Date;
    
    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    createdAt: Date;

}
