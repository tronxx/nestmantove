import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
    JoinColumn,
    UpdateDateColumn
  } from 'typeorm';

@Entity('chofer')

export class Chofer {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', length:4, nullable: false})
    codigo: string;

    @Column({type: 'varchar', length:100})
    nombre: string;

    @Column({type: 'varchar', length:100})
    direc: string;

    @Column({type: 'varchar', length:100})
    ciudad: string;

    @Column({type: 'varchar', length:100})
    telefono: string;

    @Column({type: 'varchar', length:1})
    status: string;

    @Column({type: 'integer'})
    cia: number;


    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    createdAt: Date;
  
}
