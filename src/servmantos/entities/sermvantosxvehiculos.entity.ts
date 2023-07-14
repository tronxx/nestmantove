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

@Entity('servmantosxvehiculo')

export class ServmantosxVehiculo  {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'integer'})
    idservmanto: number;

    @Column({type: 'integer'})
    idvehiculo: number;

    @Column({type: 'integer'})
    xcada: number;

    @Column({type: 'integer'})
    cia: number;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    createdAt: Date;
  
}
