import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
    JoinColumn,
    UpdateDateColumn,
    PrimaryColumn,
    OneToMany
  } from 'typeorm';

import { Precioscomb }   from '../../precioscomb/entities';

@Entity('combust')

export class Combust {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', length:1, nullable: false})
    clave: string;

    @Column({type: 'varchar', length:10, nullable: false})
    descri: string;

    @Column({type: 'decimal', precision: 10, scale: 2, default: 0})
    prelit: number;

    @Column({type: 'decimal', precision: 10, scale: 2, default: 0})
    piva: number;

    @UpdateDateColumn()
    ultcam: Date; // Last updated date

    @Column({type: 'integer'})
    cia: number;

    @Column({type: 'varchar', length:1})
    status: string;
    
    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    createdAt: Date;

}
