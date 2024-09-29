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
export class Avaliacao {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Morador)
  @JoinColumn({ name: "moradorId" })
  morador: Morador;

  @ManyToOne(() => Colaborador)
  @JoinColumn({ name: "colaboradorId" })
  colaborador: Colaborador;

  @Column()
  data_avaliacao: Date;

  @Column()
  nota: number;

  @Column()
  comentarios: string;
}
