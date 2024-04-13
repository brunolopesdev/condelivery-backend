import "reflect-metadata"
import { DataSource } from "typeorm"
import User from "./entity/User"

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "isilo.db.elephantsql.com",
  port: 5432,
  username: "jthhpoqo",
  password: "WCt71Pwvav9jpi9esEEjdwkNNAMnXogr",
  database: "jthhpoqo",
  synchronize: true,
  logging: false,
  entities: [User],
  migrations: [],
  subscribers: [],
});
