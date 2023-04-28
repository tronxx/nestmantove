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

@Entity('estados')

export class Estados {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', length:100, nullable: false})
    estado: string;

    @Column({type: 'integer'})
    cia: number;

    @Column({type: 'varchar', length:1})
    status: string;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    createdAt: Date;
  
}
