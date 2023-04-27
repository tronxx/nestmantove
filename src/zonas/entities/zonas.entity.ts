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

@Entity('zonas')

export class Zonas {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'integer', nullable: false})
    zona: number;

    @Column({type: 'varchar', length:30, nullable: false})
    nombre: string;

    @Column({type: 'integer'})
    cia: number;

    @Column({type: 'varchar', length:1})
    status: string;
    
    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    createdAt: Date;
  
}
