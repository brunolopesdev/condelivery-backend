import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Usuario } from "./Usuario";
import { Condominio } from "./Condominio";
import { Entrega } from "./Entrega";
import { Notificacao } from "./Notificacao";
import { Integracao } from "./Integracao";

@Entity()
export class Morador {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Usuario, (usuario) => usuario.moradores)
  usuario: Usuario;

  @OneToMany(() => Entrega, (entrega) => entrega.morador)
  entregas: Entrega[];

  @ManyToOne(() => Condominio, (condominio) => condominio.moradores)
  condominio: Condominio;

  @Column({ nullable: true })
  complemento: string;

  @Column()
  preferencias_notificacoes: string;

  @OneToMany(() => Notificacao, (notificacao) => notificacao.morador)
  notificacoes: Notificacao[];

  @OneToMany(() => Integracao, (integracao) => integracao.morador)
  integracoes: Integracao[];
}
