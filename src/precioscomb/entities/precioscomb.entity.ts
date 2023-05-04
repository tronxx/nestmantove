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

import { Combust } from '../../combust/entities';

@Entity('precioscomb')

export class Precioscomb {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'integer'})
    idcombust: number;

    @Column({type: 'date'})
    fecha: string;

    @Column({type: 'decimal', precision: 10, scale: 2, default: 0})
    prelit: number;

    @Column({type: 'integer'})
    cia: number;
    
    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    createdAt: Date;
  
}
