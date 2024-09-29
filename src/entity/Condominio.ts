import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Morador } from "./Morador";
import { Colaborador } from "./Colaborador";

@Entity()
export class Condominio {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  endereco: string;

  @Column()
  numero_moradores: number;

  @Column()
  taxa_condominio: number;

  @Column()
  data_registro: Date;

  @OneToMany(() => Morador, (morador) => morador.condominio)
  moradores: Morador[];

  @OneToMany(() => Colaborador, (colaborador) => colaborador.condominio)
  colaboradores: Colaborador[];
}
