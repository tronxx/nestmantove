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

@Entity('cias')

export class Cia {
    @PrimaryColumn ()
    cia: number;

    @Column({type: 'varchar', length:70, nullable: false})
    razon: string;

    @Column({type: 'varchar', length:70})
    direc: string;

    @Column({type: 'varchar', length:70})
    direc2: string;

    @Column({type: 'varchar', length:70})
    nomfis: string;

    @Column({type: 'varchar', length:70})
    telefono: string;

    @Column({type: 'varchar', length:70})
    fax: string;

    @Column({type: 'varchar', length:70})
    rfc: string;

    @Column({type: 'varchar', length:1})
    status: string;
    
    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    createdAt: Date;
  
}
