import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Morador } from "./Morador";

@Entity()
export class Integracao {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Morador)
  morador: Morador;

  @Column()
  plataforma: string;

  @Column()
  data_integracao: Date;

  @Column()
  status: string;
}
