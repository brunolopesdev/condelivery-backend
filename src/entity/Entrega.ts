import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Morador } from "./Morador";
import { Colaborador } from "./Colaborador";

@Entity()
export class Entrega {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Morador)
  morador: Morador;

  @ManyToOne(() => Colaborador)
  colaborador: Colaborador;

  @Column()
  data_entrega: Date;

  @Column({ nullable: true })
  complemento: string;

  @Column({ nullable: true })
  status: string;

  @Column()
  codigo_confirmacao: string;

  @Column({ nullable: true })
  plataforma: string;
}
