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

@Entity('usuarios')

export class Usuarios {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', length:15, nullable: false})
    login: string;

    @Column({type: 'varchar', length:100, nullable: false})
    nombre: string;

    @Column({type: 'varchar', length:100, nullable: false})
    clave: string;

    @Column({type: 'varchar', length:100})
    email: string;

    @Column({type: 'varchar', length:100})
    padre: string;

    @Column({type: 'varchar', length:1})
    maestro: string;

    @Column({type: 'varchar', length:2})
    numpol: string;

    @Column({type: 'varchar', length:10})
    iniciales: string;

    @Column({type: 'integer'})
    cia: number;

    @Column({type: 'varchar', length:1})
    status: string;
    
    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    createdAt: Date;
  
}
