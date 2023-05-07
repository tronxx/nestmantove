import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
    JoinColumn,
    UpdateDateColumn,
    PrimaryColumn
  } from 'typeorm';

@Entity('renpogas')

export class Renpogas {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'integer'})
    idpoligas: number;

    @Column({type: 'integer'})
    idvehiculo: number;

    @Column({type: 'integer'})
    kmtant: number;

    @Column({type: 'integer'})
    kmtact: number;

    @Column({type: 'integer'})
    recorr: number;

    @Column({type: 'double precision'})
    preciou: number;

    @Column({type: 'date', nullable: false})
    fecnot: string;

    @Column({type: 'integer'})
    idcombust: number;

    @Column({type: 'integer'})
    idchofer: number;

    @Column({type: 'integer'})
    idzona: number;

    @Column({type: 'double precision'})
    importe: number;

    @Column({type: 'double precision'})
    iva: number;

    @Column({type: 'double precision'})
    total: number;

    @Column({type: 'double precision'})
    piva: number;

    @Column({type: 'integer'})
    idusuario: number;

    @Column({type: 'integer'})
    conse: number;

    @Column({type: 'integer'})
    kmtacu: number;

    @Column({type: 'integer'})
    idtipago: number;

    @Column({type: 'double precision'})
    litros: number;

    @Column({type: 'integer'})
    cia: number;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    createdAt: Date;
  
}
