import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
    JoinColumn,
    UpdateDateColumn
  } from 'typeorm';

@Entity('kardex')
export class Kardex {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'integer'})
    idalm: number;

    @Column({type: 'integer'})
    idart: number;

    @Column({type: 'integer'})
    docto: number;

    @Column({type: 'date'})
    fecha: string;

    @Column({type: 'integer'})
    folio: number;

    @Column({type: 'integer'})
    idserie: number;

    @Column({type: 'varchar', length:100})
    descri: string;

    @Column({type: 'integer'})
    canti: number;

    @Column({type: 'double precision'})
    costou: number;

    @Column({type: 'varchar', length:1})
    status: string;

    @Column({type: 'varchar', length:1})
    salio: string;

    @Column({type: 'varchar', length:100})
    descrisale: string;

    @Column({type: 'date'})
    fechasale: string;

    @Column({type: 'integer'})
    cia: number;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
    updateAt: Date;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    createdAt: Date;
  
}
