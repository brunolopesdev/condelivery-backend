import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Morador } from "./Morador";
import { Colaborador } from "./Colaborador";

@Entity()
export class Suporte {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Morador, { nullable: true })
  @JoinColumn({ name: "moradorId" })
  morador: Morador;

  @ManyToOne(() => Colaborador, { nullable: true })
  @JoinColumn({ name: "colaboradorId" })
  colaborador: Colaborador;

  @Column()
  data_solicitacao: Date;

  @Column()
  tipo_problema: string;

  @Column()
  descricao: string;

  @Column()
  status: string;
}
