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

@Entity('renposerv')

export class Renposerv {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'integer'})
    idpoliserv: number;

    @Column({type: 'integer'})
    idvehiculo: number;

    @Column({type: 'date', nullable: false})
    fecha: string;

    @Column({type: 'integer'})
    conse: number;

    @Column({type: 'integer'})
    idservmanto: number;

    @Column({type: 'integer'})
    kilom: number;

    @Column({type: 'varchar', length:1, nullable: false})
    edotoggle: string;

    @Column({type: 'integer'})
    idtalleraut: number;

    @Column({type: 'varchar', length:200, nullable: true})
    observ: string;

    @Column({type: 'double precision'})
    costo: number;

    @Column({type: 'integer'})
    idchofer: number;

    @Column({type: 'integer'})
    idusuario: number;

    @Column({type: 'integer'})
    cia: number;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    createdAt: Date;
  
}
