import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Morador } from "./Morador";

@Entity()
export class Notificacao {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  mensagem: string;

  @Column()
  data: Date;

  @ManyToOne(() => Morador, (morador) => morador.notificacoes)
  morador: Morador;
}
