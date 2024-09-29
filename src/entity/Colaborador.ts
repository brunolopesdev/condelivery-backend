import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { Usuario } from "./Usuario";
import { Condominio } from "./Condominio";
import { Entrega } from "./Entrega";
import { Avaliacao } from "./Avaliacao";

@Entity()
export class Colaborador {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Usuario, (usuario) => usuario.colaborador)
  @JoinColumn()
  usuario: Usuario;

  @ManyToOne(() => Condominio, (condominio) => condominio.colaboradores)
  condominio: Condominio;

  @OneToMany(() => Entrega, (entrega) => entrega.colaborador)
  entregas: Entrega[];

  @Column()
  data_contratacao: Date;

  @Column()
  numero_entregas: number;

  @Column()
  avaliacao_media: number;

  @OneToMany(() => Avaliacao, (avaliacao) => avaliacao.colaborador)
  avaliacoes: Avaliacao[];
}
