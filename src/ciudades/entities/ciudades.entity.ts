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

@Entity('ciudades')

export class Ciudades {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', length:100, nullable: false})
    ciudad: string;

    @Column({type: 'integer'})
    cia: number;

    @Column({type: 'integer'})
    idestado: number;

    @Column({type: 'varchar', length:1})
    status: string;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    createdAt: Date;
  
}
