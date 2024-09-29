import "reflect-metadata"
import { DataSource } from "typeorm"
import { Usuario } from "./entity/Usuario";
import { Morador } from "./entity/Morador";
import { Colaborador } from "./entity/Colaborador";
import { Entrega } from "./entity/Entrega";
import { Avaliacao } from "./entity/Avaliacao";
import { Suporte } from "./entity/Suporte";
import { Integracao } from "./entity/Integracao";
import { Notificacao } from "./entity/Notificacao";
import { Condominio } from "./entity/Condominio";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "aws-0-us-west-1.pooler.supabase.com",
  port: 5432,
  username: "postgres.xibvypndxvkgrqoyfpmw",
  password: "14116566Br***",
  database: "postgres",
  synchronize: true,
  logging: false,
  entities: [
    Usuario,
    Morador,
    Colaborador,
    Entrega,
    Avaliacao,
    Suporte,
    Integracao,
    Notificacao,
    Condominio,
  ],
  migrations: [
    "src/migrations/*.ts"
  ],
  subscribers: [],
  ssl: true,
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
});
