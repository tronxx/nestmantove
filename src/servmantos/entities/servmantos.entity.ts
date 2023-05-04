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

@Entity('servmantos')

export class ServMantos  {
    @PrimaryGeneratedColumn()
    id: number;


    @Column({type: 'varchar', length:10, nullable: false})
    clave: string;

    @Column({type: 'varchar', length:100, nullable: false})
    descri: string;

    @Column({type: 'varchar', length:1, nullable: false})
    mantoorepar: string;

    @Column({type: 'varchar', length:1, nullable: false})
    perio: string;

    @Column({type: 'varchar', length:1, nullable: false})
    kmofe: string;

    @Column({type: 'integer'})
    xcada: number;

    @Column({type: 'integer'})
    toler: number;

    @Column({type: 'varchar', length:1, nullable:false})
    toggle: string;

    @Column({type: 'varchar', length:100, nullable:true})
    servop: string;

    @Column({type: 'varchar', length:1, nullable:false})
    motoocam: string;

    @Column({type: 'integer'})
    cia: number;

    @Column({type: 'integer'})
    idvehiculo: number;

    @Column({type: 'varchar', length:1})
    status: string;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    createdAt: Date;
  
}
