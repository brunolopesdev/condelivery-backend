import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne } from "typeorm";
import { Morador } from "./Morador";
import { Colaborador } from "./Colaborador";

@Entity()
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  email: string;

  @Column()
  telefone: string;

  @Column()
  tipo_usuario: string;

  @Column()
  data_registro: Date;

  @Column({ nullable: false })
  password: string;

  @OneToMany(() => Morador, (morador) => morador.usuario)
  moradores: Morador[];

  @OneToOne(() => Colaborador, (colaborador) => colaborador.usuario, {
    nullable: true,
  })
  colaborador: Colaborador;
}
