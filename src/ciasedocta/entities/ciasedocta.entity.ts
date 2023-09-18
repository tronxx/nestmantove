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

@Entity('ciasedocta')

export class Ciasedocta {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'integer'})
    docto: number;

    @Column({type: 'date', nullable: false})
    fecha: string;

    @Column({type: 'date', nullable: false})
    vence: string;

    @Column({type: 'varchar', length:200, nullable: false})
    concepto: string;

    @Column({type: 'varchar', length:1, nullable: false})
    coa: string;

    @Column({type: 'varchar', length:1, nullable: false})
    tipo: string;

    @Column({type: 'double precision'})
    importe: number;

    @Column({type: 'double precision'})
    saldo: number;

    @Column({type: 'integer'})
    facafec: number;

    @Column({type: 'integer'})
    cia: number;

    @Column({type: 'varchar', length:1})
    status: string;
    
    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    createdAt: Date;
  
}
