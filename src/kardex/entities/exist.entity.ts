import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
    JoinColumn,
    UpdateDateColumn
  } from 'typeorm';

@Entity('exist')
export class Exist {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'integer'})
    idalm: number;

    @Column({type: 'integer'})
    idart: number;

    @Column({type: 'integer'})
    inicial: number;

    @Column({type: 'integer'})
    entran: number;

    @Column({type: 'integer'})
    salen: number;

    @Column({type: 'integer'})
    exist: number;

    @Column({type: 'varchar', length:1})
    status: string;

    @Column({type: 'integer'})
    cia: number;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
    updateAt: Date;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    createdAt: Date;
  
}
