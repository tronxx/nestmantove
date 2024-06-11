import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
    JoinColumn,
    Unique,
    UpdateDateColumn
  } from 'typeorm';

@Entity('clientes')
@Unique(['codigo', 'cia'])
export class Cliente {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', length:20, nullable:false})
    codigo: string;

    @Column({type: 'varchar', length:100})
    appat: string;

    @Column({type: 'varchar', length:100})
    apmat: string;

    @Column({type: 'varchar', length:100})
    nombre1: string;

    @Column({type: 'varchar', length:100})
    nombre2: string;

    @Column({type: 'varchar', length:100})
    direc: string;

    @Column({type: 'varchar', length:20})
    codpostal: string;

    @Column({type: 'varchar', length:100})
    telefono: string;

    @Column({type: 'varchar', length:100})
    email: string;

    @Column({type: 'varchar', length:1})
    status: string;

    @Column({type: 'integer',  default:1})
    idciudad: number;

    @Column({type: 'integer',  default:1})
    idregimen: number;

    @Column({type: 'integer',  default:1})
    cia: number;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
    updateAt: Date;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    createdAt: Date;
  
}
