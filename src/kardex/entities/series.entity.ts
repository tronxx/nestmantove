import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
    JoinColumn,
    UpdateDateColumn
  } from 'typeorm';

@Entity('series')
export class Series {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', length:100})
    serie: string;

    @Column({type: 'integer',  default:1})
    cia: number;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
    updateAt: Date;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    createdAt: Date;
  
}
