import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
    JoinColumn,
    UpdateDateColumn
  } from 'typeorm';

@Entity('inven')
export class Inven {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', length:13, nullable: false})
    codigo: string;

    @Column({type: 'varchar', length:14})
    cod2: string;

    @Column({type: 'varchar', length:100})
    descri: string;

    @Column({type: 'varchar', length:3})
    tipo: string;

    @Column({type: 'varchar', length:4})
    linea: string;

    @Column({type: 'varchar', length:10})
    grupo: string;

    @Column({type: 'double precision'})
    preciou: number;

    @Column({type: 'double precision'})
    piva: number;

    @Column({type: 'double precision'})
    costos: number;

    @Column({type: 'varchar', length:1})
    status: string;

    @Column({type: 'integer'})
    inicial: number;

    @Column({type: 'integer'})
    entran: number;

    @Column({type: 'integer'})
    salen: number;

    @Column({type: 'integer'})
    exist: number;

    @Column({type: 'integer'})
    cia: number;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
    updateAt: Date;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    createdAt: Date;
  
}
