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

@Entity('talleres')

export class Talleres {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', length:5, nullable: false})
    clave: string;

    @Column({type: 'varchar', length:100})
    nombre: string;

    @Column({type: 'varchar', length:100})
    representante: string;


    @Column({type: 'varchar', length:100})
    direc: string;

    @Column({type: 'varchar', length:70})
    telefono: string;

    @Column({type: 'integer'})
    cia: number;

    @Column({type: 'varchar', length:100})
    giro: string;

    @Column({type: 'varchar', length:1})
    status: string;

    @Column({type: 'date'})
    fecbaj: Date;
    
    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    createdAt: Date;
  
}
